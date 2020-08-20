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

  function onDragEnd({ destination, source, draggableId }: DropResult): void {
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const startDayId = source.droppableId;
    const finishDayId = destination.droppableId;

    if (startDayId === finishDayId) {
      const newStopIds = [...localData.days[startDayId]];
      newStopIds.splice(source.index, 1);
      newStopIds.splice(destination.index, 0, draggableId);

      setLocalData((oldData) => ({
        ...oldData,
        days: {
          ...oldData.days,
          [startDayId]: newStopIds,
        },
      }));
      return;
    }

    const startStopIds = [...localData.days[startDayId]];
    startStopIds.splice(source.index, 1);
    const finishStopIds = [...localData.days[finishDayId]];
    finishStopIds.splice(destination.index, 0, draggableId);

    setLocalData((oldData) => ({
      ...oldData,
      days: {
        ...oldData.days,
        [startDayId]: startStopIds,
        [finishDayId]: finishStopIds,
      },
    }));
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div id="days">
        {localData.daysOrder.map((dayId) => {
          const stopIds = localData.days[dayId];
          const stops = stopIds.map((stopId) =>
            localData.stops.find((stop) => stop.properties.name === stopId)
          );
          return <Day dayId={dayId} stops={stops} key={dayId} />;
        })}
      </div>
    </DragDropContext>
  );
}

const StopList = styled.div``;

function Day({
  dayId,
  stops,
}: {
  dayId: string;
  stops: Array<Stop | undefined>;
}): JSX.Element {
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
            {stops.map(
              (stop, index) =>
                stop && (
                  <StopCard
                    key={stop.properties.name}
                    stop={stop}
                    index={index}
                  />
                )
            )}
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
