import React from 'react';
import { useSinglePhoto } from '../hooks/photos';

const HeroImage: React.FC<{ queryText: string; className?: string }> = ({
  queryText,
  className,
  children,
}) => {
  const photo = useSinglePhoto({ queryText });

  return (
    <div
      className={`${className} w-full bg-center bg-cover bg-gray-700`}
      style={{ backgroundImage: `url(${photo.imgUrl})`, minHeight: '25vh' }}
    >
      {children}
    </div>
  );
};

export default HeroImage;
