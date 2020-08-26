import React from 'react';
import { Dayjs } from 'dayjs';

type Props = {
  dayId: string;
  day?: Dayjs | null;
};

const TimelineHeader: React.FC<Props> = ({ dayId, day }) => {
  const result =
    dayId === '-1' ? (
      <div className="ml-1">
        <span className="text-sm italic text-red-400 lowercase">
          Not yet scheduled
        </span>
      </div>
    ) : (
      <div className="mt-2 ml-1">
        <span className="font-bold text-gray-800 uppercase">
          {day ? day.format('dddd DD MMM') : `Day ${dayId}`}
        </span>
      </div>
    );

  return result;
};

export default TimelineHeader;
