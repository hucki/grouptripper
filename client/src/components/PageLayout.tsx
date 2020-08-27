import React from 'react';
import DefaultNavigation from './Navigation';

type Props = {
  Navigation?: React.FC;
};

const PageLayout: React.FC<Props> = ({
  Navigation = DefaultNavigation,
  children,
}) => {
  return (
    <div className="flex flex-col h-screen">
      <Navigation />
      {children}
    </div>
  );
};

export default PageLayout;
