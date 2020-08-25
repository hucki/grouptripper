import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as RightChevron } from '../assets/right-chevron.svg';

type Props = {
  Navigation: React.FC;
};

const LandingPage: React.FC<Props> = ({ Navigation }) => (
  <div className="flex flex-col h-screen">
    <Navigation />
    <section
      className="h-full bg-center bg-cover"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1476990789491-712b869b91a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2688&q=80")',
      }}
    >
      <div className="container grid h-full p-4 mx-auto lg:grid-cols-3">
        <header className="self-center col-start-1 col-end-3 p-6 text-gray-100">
          <BackgroundShim className="mb-6">
            <h1 className="text-6xl font-semibold ">
              Discover the world with friends
            </h1>
          </BackgroundShim>
          <Link to="/create-trip">
            <div className="flex items-center">
              <p className="text-xl">Get started </p>
              <RightChevron />
            </div>
          </Link>
        </header>
      </div>
    </section>
  </div>
);

export default LandingPage;

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
