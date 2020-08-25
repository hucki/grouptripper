import React, { useState, useEffect } from 'react';
import unsplash from '../../services/unsplashClient.js';
import ImageList from './ImagesList.js';

export default function TripImages({ trip }) {//eslint-disable-line
  const [images, setImages] = useState([]);

  const stopNames = trip.stopsCollection.features.map((feature) => {//eslint-disable-line
    return feature.properties.name;
  });

  useEffect(() => {
    unsplash
      .get('/search/photos', {
        params: {
          query: `${stopNames.toString()}`,
          per_page: 15 //eslint-disable-line
        },
      })
      .then((response) => {
        setImages(response.data.results);
      });
  }, []);//eslint-disable-line

  return (
    <div
      className="container"
      style={{ marginTop: '12px', height: '40vh', overflowY: 'scroll' }}
    >
      {images && <ImageList images={images} />}
    </div>
  );
}
