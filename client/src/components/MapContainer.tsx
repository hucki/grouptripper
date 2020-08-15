import React from 'react';
import { Map, TileLayer, Marker, Polyline, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import { useQuery } from 'react-query';
import ApiClient from '../services/ApiClient';

function MapContainer(): JSX.Element {
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

  const route = {
    geometry: {
      coordinates: [
        [-0.089934, 51.504948],
        [-0.090139, 51.504847],
        [-0.090249, 51.504827],
        [-0.090467, 51.504786],
        [-0.090765, 51.504744],
        [-0.091166, 51.504705],
        [-0.091905, 51.504687],
        [-0.092378, 51.50469],
        [-0.092536, 51.50469],
        [-0.093008, 51.504709],
        [-0.093839, 51.504762],
        [-0.093971, 51.504771],
        [-0.094113, 51.504783],
        [-0.095477, 51.504906],
        [-0.095638, 51.50492],
        [-0.095867, 51.504945],
        [-0.096435, 51.505019],
        [-0.096582, 51.505043],
        [-0.097067, 51.505126],
        [-0.097242, 51.50516],
        [-0.097574, 51.505216],
        [-0.097951, 51.505281],
        [-0.098253, 51.505329],
        [-0.098687, 51.505416],
        [-0.098778, 51.505434],
        [-0.100634, 51.505854],
        [-0.100803, 51.505902],
        [-0.100913, 51.505932],
        [-0.102048, 51.506255],
        [-0.102382, 51.506361],
        [-0.102556, 51.506419],
        [-0.103073, 51.506591],
        [-0.103688, 51.506818],
        [-0.104015, 51.506978],
        [-0.104042, 51.506993],
        [-0.104079, 51.507014],
        [-0.10418, 51.507058],
        [-0.104249, 51.507088],
        [-0.104328, 51.507121],
        [-0.104463, 51.507138],
        [-0.104451, 51.507276],
        [-0.104396, 51.507499],
        [-0.104385, 51.507881],
        [-0.104348, 51.507917],
        [-0.104356, 51.50798],
        [-0.104347, 51.50806],
        [-0.10435, 51.508224],
        [-0.104389, 51.508393],
        [-0.104402, 51.508482],
        [-0.104468, 51.508537],
        [-0.10446, 51.508949],
        [-0.10443, 51.509784],
        [-0.104429, 51.510124],
        [-0.104414, 51.510608],
        [-0.104423, 51.510907],
        [-0.104476, 51.51106],
        [-0.104508, 51.511128],
        [-0.104551, 51.511224],
        [-0.104573, 51.511288],
        [-0.104583, 51.511355],
        [-0.104574, 51.51141],
        [-0.104561, 51.511459],
        [-0.104515, 51.511513],
        [-0.104255, 51.511721],
        [-0.104165, 51.511771],
        [-0.104158, 51.511786],
        [-0.104151, 51.511803],
        [-0.104154, 51.51187],
        [-0.104162, 51.511931],
        [-0.104163, 51.51194],
        [-0.104202, 51.511971],
        [-0.104217, 51.511997],
        [-0.104208, 51.51203],
        [-0.104178, 51.512091],
        [-0.104176, 51.512118],
        [-0.104202, 51.512352],
        [-0.104203, 51.512522],
        [-0.104199, 51.512712],
        [-0.104193, 51.5129],
        [-0.104191, 51.513057],
        [-0.104191, 51.513075],
        [-0.104191, 51.513154],
        [-0.104315, 51.513162],
        [-0.1049, 51.5132],
        [-0.104983, 51.512538],
        [-0.104999, 51.512538],
        [-0.105052, 51.512526],
        [-0.105304, 51.512537],
        [-0.105722, 51.512523],
        [-0.105803, 51.51254],
        [-0.105865, 51.512541],
        [-0.106223, 51.512545],
        [-0.1068, 51.512544],
      ],
      type: 'LineString',
    },
  };
  const markers = stops.map((stop) => (
    <Marker key={stop.id} position={[stop.lat, stop.lng]}></Marker>
  ));

  const center: [number, number] = [stops[0].lat, stops[1].lng];
  const polyline = route.geometry.coordinates.map(
    (latLng) => new L.LatLng(latLng[1], latLng[0])
  );

  const { status, data, error } = useQuery('pois', ApiClient.getPois);

  if (status === 'loading') return <div>Loading ...</div>;
  if (error) return <div>error</div>;

  interface PoiContainer {
    [key: number]: GeoJSON.Feature;
  }

  const poiContainer: PoiContainer = {};
  const pois = data?.features.map((poi: GeoJSON.Feature) => {
    if (poiContainer[poi.properties?.osm_id]) return null;
    else {
      poiContainer[poi.properties?.osm_id] = poi;
      return <GeoJSON data={poi} key={poi.properties?.osm_id} />;
    }
  });

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
        {markers}
        <Polyline positions={polyline} color="lime" />
        {pois}
      </Map>
    </>
  );
}

export default MapContainer;
