import React from 'react';
import { Map, TileLayer, Marker, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useQuery } from 'react-query';
import ApiClient from '../services/ApiClient';
import gtmarker from '../assets/gtmarker.png';

const poiMarker = new L.Icon({
  iconUrl: gtmarker,
  iconSize: [36, 48],
  iconAnchor: [16, 45],
});

export default function MapContainer({ ...props }): JSX.Element {
  const { trip } = props;

  const gotPois = useQuery('pois', ApiClient.getPois);
  const gotRoute = useQuery('route', ApiClient.getRoute);

  if (gotRoute.status === 'loading' || gotPois.status === 'loading')
    return <div>Loading ...</div>;
  if (gotRoute.error) return <div>error: {gotRoute.error}</div>;
  if (gotPois.error) return <div>error: {gotPois.error}</div>;

  if (!trip.details) return <div> old trip format. No map Data available </div>;

  const markers = trip.details.features.map(
    (feature: GeoJSON.Feature, index: number) => (
      <GeoJSON
        data={feature}
        key={index}
        pointToLayer={(feature, latlng): L.Marker =>
          L.marker(latlng, { icon: poiMarker })
        }
      />
    )
  );

  const center: [number, number] = [
    trip.details.features[0].geometry.coordinates[1],
    trip.details.features[0].geometry.coordinates[0],
  ];

  interface PoiContainer {
    [key: number]: GeoJSON.Feature;
  }

  const poiContainer: PoiContainer = {};
  const pois = gotPois.data?.features.map((poi: GeoJSON.Feature) => {
    if (poiContainer[poi.properties?.osm_id]) return null;
    else {
      poiContainer[poi.properties?.osm_id] = poi;
      return (
        <GeoJSON
          data={poi}
          key={poi.properties?.osm_id}
          pointToLayer={(feature, latlng): L.Marker =>
            L.marker(latlng, { icon: poiMarker })
          }
        />
      );
    }
  });

  const routeDirections = gotRoute.data?.features.map(
    (feature: GeoJSON.Feature, index: number) => {
      return <GeoJSON data={feature} key={index} />;
    }
  );
  return (
    <>
      <Map
        center={center}
        zoom={13}
        className="container h-64 max-w-screen-lg mx-auto"
      >
        <TileLayer
          attribution='Map tiles by <a target="_top" href="http://stamen.com">Stamen Design</a>, under <a target="_top" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
          url="http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg"
        />
        {routeDirections}
        {markers}
        {pois}
      </Map>
    </>
  );
}
