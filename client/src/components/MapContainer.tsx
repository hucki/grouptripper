import React from 'react';
import { Map, TileLayer, Marker, GeoJSON } from 'react-leaflet';
import L, { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useQuery } from 'react-query';
import ApiClient from '../services/ApiClient';
import gtmarker from '../assets/gtmarker.png';
import { Trip } from '../types/Trip';

const poiMarker = new L.Icon({
  iconUrl: gtmarker,
  iconSize: [36, 48],
  iconAnchor: [16, 45],
});

function getAllCoordinates(trip: Trip): number[][] {
  // const allCoordinates = trip.details.features.map((feature) => {
  //   if (feature.geometry) {
  //     return feature.geometry.coordinates;
  //   }
  // });
  return [
    //lonLat coming from GeoJSON
    [-74.0059731, 40.7143528], //New York
    [-87.6297982, 41.8781136], //Chicago
    [-84.3879824, 33.7489954], //Atlanta
  ];
}
function centerOfGravity(coordinates: number[][]): LatLngTuple {
  const weight = new Array(coordinates.length).fill(1);
  const totalWeight = weight.reduce((acc, cur) => (acc = acc + cur));

  const combinedCartesianCoordinates = coordinates.reduce(
    (acc, cur, index, arr) => {
      const lat = (cur[1] * Math.PI) / 180; //convert to radians
      const lon = (cur[0] * Math.PI) / 180; //convert to radians
      const x = Math.cos(lat) * Math.cos(lon) * weight[index];
      const y = Math.cos(lat) * Math.sin(lon) * weight[index];
      const z = Math.sin(lat) * weight[index];
      return [acc[0] + x, acc[1] + y, acc[2] + z];
    },
    [0, 0, 0]
  );
  const midpointX = combinedCartesianCoordinates[0] / totalWeight;
  const midpointY = combinedCartesianCoordinates[1] / totalWeight;
  const midpointZ = combinedCartesianCoordinates[2] / totalWeight;

  const midpointLat = Math.atan2(midpointY, midpointX);
  const midpointHyp = Math.sqrt(midpointX * midpointX + midpointY * midpointY);
  const midpointLon = Math.atan2(midpointZ, midpointHyp);

  // switching lat/lon again
  const latLonDegrees: LatLngTuple = [
    midpointLon * (180 / Math.PI),
    midpointLat * (180 / Math.PI),
  ];
  return latLonDegrees;
}

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

  const center = centerOfGravity(getAllCoordinates(trip));
  // const zoom = () => {};

  // const center: [number, number] = trip.details.features[0].geometry
  //   ? [
  //       trip.details.features[0].geometry.coordinates[1],
  //       trip.details.features[0].geometry.coordinates[0],
  //     ]
  //   : [51.507113101069415, -0.10449886322021484];

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
        className="container w-full h-full mx-auto"
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
