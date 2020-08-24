import React, { useEffect, useState } from 'react';
import MapContainer from './MapContainer';
import { useParams, Link } from 'react-router-dom';
import TripCard from './TripCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import TripDragger from './TripDragger';
import AutoComplete from './AutoCompleteStandalone';
import { useTrip } from '../hooks/trips';
import Invite from './Invite';
import { useCreateStop } from '../hooks/stops';
// import { Formik, Form, FormikProps } from 'formik';
import { Stop } from '../types/Stop';

export default function TripEdit(): JSX.Element {
  const { id } = useParams();
  const { isLoading, error, trip } = useTrip(id);
  const [newStop, setNewStop] = useState<Stop>();
  const [createStop /*, { error: savingError }*/] = useCreateStop(id);

  useEffect(() => {
    if (newStop && trip?._id) {
      createStop({ tripId: trip?._id, stop: transformStop(newStop) });
      setNewStop(undefined);
    }
  }, [newStop, trip, createStop]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error getting trips: {error}</div>;
  if (!trip) return <div>No trip found</div>;

  const Timeline = (): JSX.Element => {
    return (
      <div className="container flex justify-center w-full mx-auto">
        <div className="flex flex-col w-full p-4 bg-white rounded-lg shadow">
          <div key="rowHeader" className="flex flex-col">
            <Link
              to={`/trips/${id}`}
              className="-mt-2 -mr-2 w-1/8"
              style={{ alignSelf: 'flex-end' }}
            >
              <div
                className="flex justify-center p-2 mr-1 text-xs font-bold text-white uppercase bg-teal-500 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none"
                style={{ transition: 'all .15s ease' }}
              >
                <FontAwesomeIcon icon={faSave} />
              </div>
            </Link>
          </div>
          <TripDragger id={id} trip={trip} />
        </div>
      </div>
    );
  };

  type StopInput = {
    name: string;
    label: string;
    description?: string;
  };

  function transformStop(stopInput: Stop): Stop {
    const res = {
      geometry: {
        type: 'Point' as const,
        coordinates: [
          stopInput.geometry.coordinates[0] || 0,
          stopInput.geometry.coordinates[1] || 0,
        ],
      },
      properties: {
        name: stopInput.properties.name,
        label: stopInput.properties.label,
        description: stopInput.properties.description,
        upvotes: stopInput.properties.upvotes || 0,
        downvotes: stopInput.properties.upvotes || 0,
        tripDay: stopInput.properties.tripDay || -1,
      },
      type: 'Feature' as const,
    };
    return res;
  }

  type TripInput = {
    name: string;
    country: string;
    startDate: string;
    endDate: string;
    currentStop: Stop | null;
    stops: Stop[];
  };

  const StopInput = ({ values }: { values: TripInput }): JSX.Element => {
    return (
      <AutoComplete
        name="currentStop"
        countryCode={values.country}
        onAddClick={setNewStop}
      />
    );
  };
  const newStopData: TripInput = {
    name: trip.name,
    country: trip.country,
    startDate: trip.startDate.toString(),
    endDate: trip.endDate.toString(),
    currentStop: null,
    stops: [],
  };
  return (
    <>
      {trip && <TripCard trip={trip} listView={false} key={trip.name} />}
      <div className="grid grid-cols-1 grid-rows-2 gap-4 my-4 md:grid-rows-1 md:grid-cols-2">
        <div>
          <div className="grid grid-cols-2 col-gap-8">
            {/* {renderStopInput(formikProps)} */}
            <StopInput values={newStopData} />
          </div>
          {trip && <Timeline />}
        </div>
        <div>
          {trip && <MapContainer trip={trip} />}
          <div className="container flex items-center justify-center w-full mx-auto mt-4">
            <div className="flex flex-col w-full p-4 bg-white rounded-lg shadow">
              <h3 className="mb-2 text-2xl font-bold text-teal-900">
                who is on board?
              </h3>
              {trip && <Invite trip={trip} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
