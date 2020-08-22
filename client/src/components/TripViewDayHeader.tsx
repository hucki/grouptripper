import React from 'react';
// import dayjs, { Dayjs } from 'dayjs';

type DayHeaderInputProps = {
  dayId: string;
  // day?: Dayjs;
};
export default function TripViewDayHeader({
  dayId,
}: // day,
DayHeaderInputProps): JSX.Element {
  const result =
    dayId === '-1' ? (
      <div className="ml-1">
        <span className="text-sm italic text-gray-400 lowercase">
          not yet scheduled:
        </span>
      </div>
    ) : (
      <div className="mt-2 ml-1">
        {' '}
        <span className="font-extrabold text-teal-700 uppercase">
          {parseInt(dayId) + 1}.&nbsp;
          {/* &nbsp;{day && day.format('D')} */}
        </span>
        <span className="font-semibold text-teal-700 uppercase opacity-50">
          Day
          {/* {day && day.format('ddd')} */}
        </span>
      </div>
    );

  return result;
}
