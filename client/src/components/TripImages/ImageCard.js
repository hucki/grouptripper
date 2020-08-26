import React, { useState, useEffect } from 'react';

function ImageCard(props) {//eslint-disable-line
  const [spans, setSpans] = useState(0);
  const imageRef = React.createRef();

  const setImageSpans = () => {//eslint-disable-line
    const height = imageRef.current.clientHeight;
    const calculatedSpans = Math.ceil(height / 10 + 0.5);
    setSpans(calculatedSpans);
  };

  useEffect(() => {
    imageRef.current.addEventListener('load', setImageSpans);
  }, []);//eslint-disable-line

  return (
    <div style={{ gridRowEnd: `span ${spans}` }}>
      <img
        ref={imageRef}
        alt={props.image.description}
        src={props.image.urls.regular}
      />
    </div>
  );
}

export default ImageCard;
