import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DefaultNavigation from './Navigation';
import BackgroundShim from './BackgroundShim';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import lozad from 'lozad';

type Props = {
  Navigation?: React.FC;
};

const LandingPage: React.FC<Props> = ({ Navigation = DefaultNavigation }) => {
  const bgImage =
    'https://images.unsplash.com/photo-1476990789491-712b869b91a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2688&q=80';
  useEffect(() => {
    const { observe } = lozad();
    observe();
  }, []);
  return (
    <div className="flex flex-col h-screen">
      <Navigation />
      <section
        className="h-full bg-gray-700 bg-center bg-cover lozad"
        data-background-image={bgImage}
        // style={{
        //   backgroundImage:
        //     'url("https://images.unsplash.com/photo-1476990789491-712b869b91a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2688&q=80")',
        // }}
      >
        <div className="container grid h-full p-4 mx-auto lg:grid-cols-3">
          <header className="self-center col-start-1 col-end-3 p-6 text-gray-100">
            <BackgroundShim className="mb-6">
              <h1 className="text-4xl font-semibold md:text-5xl lg:text-6xl ">
                Discover the world with friends
              </h1>
            </BackgroundShim>
            <Link to="/create-trip">
              <div className="flex items-center">
                <p className="text-xl">Get started </p>
                <FontAwesomeIcon icon={faChevronRight} className="ml-3" />
              </div>
            </Link>
          </header>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
