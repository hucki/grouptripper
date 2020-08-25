import React, { useState, useEffect } from 'react';
import unsplash from '../../services/unsplashClient.js';
import ImageList from './ImagesList.js';

export default function TripImages({ trip }) {
  const [images, setImages] = useState([]);
  console.log(trip);

  useEffect(() => {
    unsplash
      .get('/search/photos', {
        params: {
          query: 'Rome',
          per_page: 15 //eslint-disable-line
        },
      })
      .then((response) => {
        // console.log(response);
        setImages(response.data.results);
      });
  }, []);

  return (
    <div className="container" style={{ marginTop: '12px' }}>
      <h2>RELATED IMAGES</h2>
      <ImageList images={images} />
    </div>
  );
}
