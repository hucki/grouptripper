import React from 'react';
import HeroImage from './HeroImage';
import BackgroundShim from './BackgroundShim';

const HeroImageWithText: React.FC<{
  queryText: string;
  className?: string;
}> = ({ queryText, children }) => (
  <HeroImage queryText={queryText} className="flex items-center">
    <div className="container grid h-full p-4 mx-auto lg:grid-cols-3">
      <div className="self-center col-start-1 col-end-3 p-6 text-gray-100">
        <BackgroundShim>{children}</BackgroundShim>
      </div>
    </div>
  </HeroImage>
);

export default HeroImageWithText;
