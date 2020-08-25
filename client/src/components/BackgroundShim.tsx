import React from 'react';

const BackgroundShim: React.FC<{ className?: string }> = ({
  className,
  children,
}) => {
  return (
    <div
      className={className}
      style={{
        backgroundColor: 'rgba(0,0,0,0.1)',
        boxShadow: '0 0 20px 35px rgba(0,0,0,0.1)',
        borderRadius: '40px',
      }}
    >
      {children}
    </div>
  );
};

export default BackgroundShim;
