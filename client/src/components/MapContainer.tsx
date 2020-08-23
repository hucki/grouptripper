import React, { useEffect } from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import L, { LatLngTuple, LatLngBoundsLiteral } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useQuery } from 'react-query';
import ApiClient from '../services/ApiClient';
import gtmarker from '../assets/gtmarker.png';
import * as geolib from 'geolib';
import { StopCollection } from '../types/Stop';
import { Trip } from '../types/Trip';

const poiMarker = new L.Icon({
  iconUrl: gtmarker,
  iconSize: [36, 48],
  iconAnchor: [16, 45],
});

type GeolibBounds = {
  maxLat: number;
  minLat: number;
  maxLng: number;
  minLng: number;
};

function getAllCoordinates(stops: StopCollection): LatLngTuple[] {
  const allCoordinates: LatLngTuple[] = stops.features.map((feature) => {
    return [feature.geometry.coordinates[0], feature.geometry.coordinates[1]];
  });
  return allCoordinates;
}

function getBounds(coordinates: LatLngTuple[]): LatLngBoundsLiteral {
  const bounds: GeolibBounds = geolib.getBounds(coordinates);
  const latLngBounds: LatLngBoundsLiteral = [];
  latLngBounds[0] = [bounds.maxLat, bounds.maxLng];
  latLngBounds[1] = [bounds.minLat, bounds.minLng];
  return latLngBounds;
}

export default function MapContainer({ trip }: { trip: Trip }): JSX.Element {
  const gotPois = useQuery('pois', ApiClient.getPois);
  const gotRoute = useQuery('route', ApiClient.getRoute);
  const markers: JSX.Element[] = [];
  const getMarkers = (): JSX.Element[] => {
    const res = trip.stopsCollection.features.map(
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
    return res;
  };
  useEffect(() => {
    markers.push(...getMarkers());
  });

  if (gotRoute.status === 'loading' || gotPois.status === 'loading')
    return <div>Loading ...</div>;
  if (gotRoute.error) return <div>error: {gotRoute.error}</div>;
  if (gotPois.error) return <div>error: {gotPois.error}</div>;

  const allCoordinates = getAllCoordinates(trip.stopsCollection);
  const bounds: LatLngBoundsLiteral = getBounds(allCoordinates);
  const centerOfBounds = geolib.getCenterOfBounds(allCoordinates);
  const center: LatLngTuple = [
    centerOfBounds.longitude,
    centerOfBounds.latitude,
  ];

  return (
    <>
      <Map
        center={center}
        useFlyTo={true}
        bounds={bounds}
        zoom={6}
        className="container w-full h-full mx-auto rounded-lg shadow"
        style={{ height: '50vh' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        />
        {markers}
      </Map>
    </>
  );
}
