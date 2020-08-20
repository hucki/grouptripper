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

function transformToDnDData(trip: Trip): DnDStrucutre {
  const tripDays = dayjs(trip.endDate).diff(trip.startDate, 'day') + 1;
  const dataStructure: DnDStrucutre = {
    stops: trip.details.features,
    days: {},
    daysOrder: [],
  };
  dataStructure.stops = trip.details.features;
  for (let i = -1; i < tripDays; i++) {
    dataStructure.daysOrder.push(i.toString());
    if (i === -1) {
      dataStructure.days[i] = dataStructure.stops
        .filter(
          (stop) =>
            stop.properties.tripDay === undefined ||
            stop.properties.tripDay === i
        )
        .map((stop) => stop.properties.name);
    } else {
      dataStructure.days[i] = dataStructure.stops
        .filter((stop) => stop.properties.tripDay === i)
        .map((stop) => stop.properties.name);
    }
  }

  return dataStructure;
}

type DnDStrucutre = {
  stops: Stop[];
  days: {
    [key: string]: string[];
  };
  daysOrder: string[];
};

export default function DraggableNew(): JSX.Element | null {
  const { id } = useParams();
  const { data: trip } = useQuery('trip', () => client<Trip>(`trips/${id}`));

  if (!trip) return null;

  const dndData = transformToDnDData(trip);

  return <DraggableTimeline data={dndData} />;
}

function DraggableTimeline({ data }: { data: DnDStrucutre }): JSX.Element {
  const [localData, setLocalData] = useState(data);

  function onDragEnd(result: DropResult): void {
    console.log(result);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div id="days">
        {localData.daysOrder.map((dayId) => {
          const stopIds = localData.days[dayId];
          const stops = localData.stops.filter((stop) =>
            stopIds.includes(stop.properties.name)
          );
          return <Day dayId={dayId} stops={stops} key={dayId} />;
        })}
      </div>
    </DragDropContext>
  );
}

const StopList = styled.div``;

function Day({ dayId, stops }: { dayId: string; stops: Stop[] }): JSX.Element {
  return (
    <div className="m-4 border border-gray-500 rounded">
      <h3 className="p-2 text-lg">
        {dayId === '-1' ? 'Unallocated Stops' : `Day ${parseInt(dayId) + 1}`}
      </h3>
      <Droppable droppableId={dayId}>
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
