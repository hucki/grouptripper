import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Stop } from '../types/Stop';
import { faHotel, faInfo } from '@fortawesome/free-solid-svg-icons';

type TimelineItemInputProps = {
  stop: Stop;
  editMode: boolean;
};

export default function TimelineItem({
  stop,
  editMode,
}: TimelineItemInputProps): JSX.Element {
  return (
    <div className={editMode ? 'rounded hover:shadow-outline' : ''}>
      <div className="flex flex-row mb-1 ml-8 text-teal-900 border-t even:bg-gray-100">
        <div className="-ml-6">
          <FontAwesomeIcon
            className="text-teal-500 opacity-75"
            icon={faHotel}
          />{' '}
        </div>
        <div className="w-full ml-5 mr-2">
          <div className="flex flex-row justify-between">
            <div className="text-sm font-semibold uppercase">
              {stop.properties.name}
            </div>
            <div>
              {stop.properties.description ? (
                <FontAwesomeIcon
                  className="text-teal-500 opacity-50 hover:opacity-100"
                  icon={faInfo}
                />
              ) : null}
            </div>
          </div>
          <div className="text-xs italic opacity-75">
            {stop.properties.label}
          </div>
          <div className="text-xs">{stop.properties.description}</div>
        </div>
      </div>
    </div>
  );
}
