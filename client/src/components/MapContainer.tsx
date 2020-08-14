import React from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';

function MapContainer() {

  // TODO: define Data structure and make it a type
  interface IStop {
    id: number;
    lat: number;
    lng: number;
    label: string;
    description: string;
  }

  // TODO: define array to use IStop Interface (or then type)
  const stops = [
    {
      id: 0,
      lat: 51.505,
      lng: -0.09,
      label: 'Central London',
      description: 'The place to be'
    },
    {
      id: 1,
      lat: 51.51258,
      lng: -0.1068,
      label: 'Not Central London',
      description: 'The place to be'
    },
  ];

  const markers = stops.map(stop => <Marker key={stop.id} position={[stop.lat,stop.lng]}></Marker>)

  const center:[number,number] = [stops[0].lat,stops[1].lng];
  return (
    <>
      <Map center={center} zoom={13} className="container h-64 max-w-screen-lg mx-auto">
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers}
      </Map>
    </>
  );
}

export default MapContainer;
