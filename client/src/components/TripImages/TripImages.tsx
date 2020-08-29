import React from 'react';
import ImageList from './ImagesList.js';
import { usePhotos } from '../../hooks/photos';
import { Trip } from '../../types/Trip.js';

const TripImages: React.FC<{ trip: Trip }> = ({ trip }) => {
  const stopNames = trip.stopsCollection.features.map((feature) => {
    //eslint-disable-line
    return feature.properties.name;
  });

  const images = usePhotos({
    queryText: `${stopNames.toString()}`,
    count: 15,
  });

  return (
    <div
      className="container"
      style={{ marginTop: '12px', height: '40vh', overflowY: 'scroll' }}
    >
      {images && <ImageList images={images} />}
    </div>
  );
};

export default TripImages;
