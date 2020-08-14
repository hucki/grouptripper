import React, {useState, useEffect} from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import ApiClient from '../services/ApiClient';

function MapContainer() {
  const [zoom] = useState(3);
  const [lat, setLat] = useState<number>(51.505);
  const [lng, setLng] = useState<number>(-0.09);

  useEffect(() => {
    getIssPosition();
    setInterval(() =>getIssPosition(), 5000)
  }, [])

  const getIssPosition = () => {
    ApiClient.getPosition()
    .then(curPosition => {
      setLat(curPosition.iss_position.latitude);
      setLng(curPosition.iss_position.longitude);
    })
  }

  const position:[number,number] = [lat, lng];
  return (
    <>
      <Map center={position} zoom={zoom} className="container h-64 max-w-screen-lg mx-auto">
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}></Marker>
      </Map>
    </>
  );
}

export default MapContainer;
