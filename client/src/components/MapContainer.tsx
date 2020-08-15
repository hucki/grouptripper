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

export default function MapContainer(/*tripStops: string[]*/): JSX.Element {
  // TODO: define Data structure and make it a type
  interface Stop {
    id: number;
    lat: number;
    lng: number;
    label: string;
    description: string;
  }

  // TODO: define array to use Stop Interface (or then type)
  const stops = [
    {
      id: 0,
      lat: 51.505,
      lng: -0.09,
      label: 'Central London',
      description: 'The place to be',
    },
    {
      id: 1,
      lat: 51.51258,
      lng: -0.1068,
      label: 'Not Central London',
      description: 'The place to be',
    },
  ];

  const markers = stops.map((stop) => (
    <Marker
      key={stop.id}
      position={[stop.lat, stop.lng]}
      icon={poiMarker}
    ></Marker>
  ));

  const center: [number, number] = [stops[0].lat, stops[1].lng];

  const gotPois = useQuery('pois', ApiClient.getPois);
  const gotRoute = useQuery('route', ApiClient.getRoute);

  if (gotRoute.status === 'loading' || gotPois.status === 'loading')
    return <div>Loading ...</div>;
  if (gotRoute.error) return <div>error: {gotRoute.error}</div>;
  if (gotPois.error) return <div>error: {gotPois.error}</div>;

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
