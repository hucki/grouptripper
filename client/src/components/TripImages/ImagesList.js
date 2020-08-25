import React from 'react';
import './ImageList.css';
import ImageCard from './ImageCard';

const Imagelist = (props) => {//eslint-disable-line
  const images = props.images.map((image) => {
    return <ImageCard key={image.id} image={image} />;
  });

  if (!images) return <div>Error</div>;

  return <div className="image-list"> {images && images} </div>;
};

export default Imagelist;
