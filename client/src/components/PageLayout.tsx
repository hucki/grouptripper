import React from 'react';

type Props = {
  Navigation: React.FC;
};

const PageLayout: React.FC<Props> = ({ Navigation, children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Navigation />
      {children}
    </div>
  );
};

export default PageLayout;
