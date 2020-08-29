import React, { useState, useRef } from 'react';
import { Photo } from '../../types/Photo';

const ImageCard: React.FC<{ image: Photo }> = ({ image }) => {
  //eslint-disable-line
  const [spans, setSpans] = useState(0);
  const imageEl = useRef<HTMLImageElement>(null);

  const setImageSpans = (): void => {
    if (imageEl && imageEl.current) {
      const height = imageEl.current.clientHeight;
      const calculatedSpans = Math.ceil(height / 10 + 0.5);
      setSpans(calculatedSpans);
    }
  };

  return (
    <div style={{ gridRowEnd: `span ${spans}` }}>
      <img
        ref={imageEl}
        alt={image.altDescription}
        src={image.imgUrlSmall}
        onLoad={setImageSpans}
      />
    </div>
  );
};

export default ImageCard;
