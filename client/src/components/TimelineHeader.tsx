import React from 'react';
import { Dayjs } from 'dayjs';

type Props = {
  dayId: string;
  day?: Dayjs | null;
};

const TimelineHeader: React.FC<Props> = ({ dayId, day }) => {
  const result =
    dayId === '-1' ? (
      <h4 className="my-2 text-sm">Not yet scheduled</h4>
    ) : (
      <h4 className="my-2 font-bold text-gray-800 uppercase">
        {day ? day.format('ddd DD MMM') : `Day ${dayId}`}
      </h4>
    );

  return result;
};

export default TimelineHeader;
