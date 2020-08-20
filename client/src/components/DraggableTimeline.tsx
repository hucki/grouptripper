import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import {
  Droppable,
  Draggable,
  DragDropContext,
  DropResult,
} from 'react-beautiful-dnd';
import styled from 'styled-components';
import { client } from '../services/ApiClient';
import { Trip } from '../types/Trip';
import { Stop } from '../types/Stop';
import dayjs from 'dayjs';

export default function TripContainer(): JSX.Element | null {
  const { id } = useParams();
  const { data: trip } = useQuery('trip', () => client<Trip>(`trips/${id}`));

  return trip ? <DraggableTimeline trip={trip} /> : null;
}

type DraggableTimelineProps = {
  trip: Trip;
};

export function DraggableTimeline({
  trip,
}: DraggableTimelineProps): JSX.Element {
  const [localTrip, setLocalTrip] = useState(trip);
  const tripDays =
    dayjs(localTrip.endDate).diff(localTrip.startDate, 'day') + 1;
  const daysArray = Array(tripDays).fill([]);
  localTrip.details.features.forEach((stop) => {
    if (stop.properties.tripDay === undefined) return;
    if (stop.properties.tripDay > -1) {
      daysArray[stop.properties.tripDay].push(stop);
    }
  });
  const unallocatedStops = localTrip.details.features.filter(
    (stop) =>
      stop.properties.tripDay === undefined || stop.properties.tripDay === -1
  );

  function onDragEnd(result: DropResult): void {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const movedStop = unallocatedStops.find(
      (stop) => stop.properties.name === draggableId
    );
    if (!movedStop) return;
    const newStopsArray = [...unallocatedStops];
    newStopsArray.splice(source.index, 1);
    newStopsArray.splice(destination.index, 0, movedStop);

    setLocalTrip((oldTrip) => ({
      ...oldTrip,
      details: {
        ...oldTrip.details,
        features: newStopsArray,
      },
    }));
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div id="days">
        <Day dayId={-1} stops={unallocatedStops} key="day--1" />
        {daysArray.map((stops, index) => (
          <Day dayId={index} stops={stops} key={`day-${index}`} />
        ))}
      </div>
    </DragDropContext>
  );
}

const StopList = styled.div``;

function Day({ dayId, stops }: { dayId: number; stops: Stop[] }): JSX.Element {
  return (
    <div className="m-4 border border-gray-500 rounded">
      <h3 className="p-2 text-lg">
        {dayId === -1 ? 'Unallocated Stops' : `Day ${dayId + 1}`}
      </h3>
      <Droppable droppableId={`day-${dayId}`}>
        {(provided): JSX.Element => (
          <StopList
            ref={provided.innerRef}
            className="p-2"
            {...provided.droppableProps}
          >
            {stops.map((stop, index) => (
              <StopCard key={stop.properties.name} stop={stop} index={index} />
            ))}
            {provided.placeholder}
          </StopList>
        )}
      </Droppable>
    </div>
  );
}

const Container = styled.div``;

function StopCard({ stop, index }: { stop: Stop; index: number }): JSX.Element {
  return (
    <Draggable draggableId={stop.properties.name} index={index}>
      {(provided): JSX.Element => (
        <Container
          className="p-4 mb-4 bg-gray-100 border border-gray-500 rounded"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {stop.properties.name}
        </Container>
      )}
    </Draggable>
  );
}
