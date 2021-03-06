import React from 'react';
import {
  Droppable,
  Draggable,
  DragDropContext,
  DropResult,
} from 'react-beautiful-dnd';
import styled from 'styled-components';
import { Trip } from '../types/Trip';
import { Stop } from '../types/Stop';
import dayjs, { Dayjs } from 'dayjs';
import { useUpdateAllStops } from '../hooks/stops';
import TimelineHeader from './TimelineHeader';
import TimelineItem from './TimelineItem';

function transformToDnDData(trip: Trip): DnDStructure {
  const tripDays = dayjs(trip.endDate).diff(trip.startDate, 'day') + 1;
  const dataStructure: DnDStructure = {
    stops: trip.stopsCollection.features,
    days: {},
    daysOrder: [],
  };
  dataStructure.stops = trip.stopsCollection.features;
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

function transformFromDnDStructure(dndStructure: DnDStructure): Stop[] {
  return dndStructure.daysOrder.flatMap((dayId) =>
    dndStructure.days[dayId].map((stopId) => {
      const stop = dndStructure.stops.find(
        (stop) => stop.properties.name === stopId
      );
      if (stop) stop.properties.tripDay = parseInt(dayId);
      return stop;
    })
  ) as Stop[];
}

type DnDStructure = {
  stops: Stop[];
  days: {
    [key: string]: string[];
  };
  daysOrder: string[];
};

type TripDraggerInputProps = {
  id: string;
  trip: Trip;
};
export default function TripDragger({
  id,
  trip,
}: TripDraggerInputProps): JSX.Element | null {
  const updateStops = useUpdateAllStops(id);

  if (!trip) return null;

  const dndData = transformToDnDData(trip);

  function saveToServer(latestDnDData: DnDStructure): void {
    const stops = transformFromDnDStructure(latestDnDData);
    updateStops({ stops });
  }

  return (
    <DraggableTimeline
      draggableStops={dndData}
      saveToServer={saveToServer}
      trip={trip}
    />
  );
}

function DraggableTimeline({
  draggableStops,
  saveToServer,
  trip,
}: {
  draggableStops: DnDStructure;
  saveToServer: (latestDndData: DnDStructure) => void;
  trip?: Trip;
}): JSX.Element {
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
      const newStopIds = [...draggableStops.days[startDayId]];
      newStopIds.splice(source.index, 1);
      newStopIds.splice(destination.index, 0, draggableId);

      const newStops = {
        ...draggableStops,
        days: {
          ...draggableStops.days,
          [startDayId]: newStopIds,
        },
      };
      saveToServer(newStops);
      return;
    }

    const startStopIds = [...draggableStops.days[startDayId]];
    startStopIds.splice(source.index, 1);
    const finishStopIds = [...draggableStops.days[finishDayId]];
    finishStopIds.splice(destination.index, 0, draggableId);

    const newStops = {
      ...draggableStops,
      days: {
        ...draggableStops.days,
        [startDayId]: startStopIds,
        [finishDayId]: finishStopIds,
      },
    };

    saveToServer(newStops);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div id="days">
        {draggableStops.daysOrder.map((dayId) => {
          const stopIds = draggableStops.days[dayId];
          const stops = stopIds.map((stopId) =>
            draggableStops.stops.find((stop) => stop.properties.name === stopId)
          );
          const day =
            dayId !== '-1'
              ? dayjs(trip?.startDate).add(parseInt(dayId), 'd')
              : null;
          return <Day dayId={dayId} stops={stops} key={dayId} day={day} />;
        })}
      </div>
    </DragDropContext>
  );
}

const StopList = styled.div``;

function Day({
  dayId,
  stops,
  day,
}: {
  dayId: string;
  stops: Array<Stop | undefined>;
  day: Dayjs | null;
}): JSX.Element {
  return (
    <div>
      <TimelineHeader key={dayId} dayId={dayId} day={day} />
      <Droppable droppableId={dayId}>
        {(provided): JSX.Element => (
          <StopList
            ref={provided.innerRef}
            className="border rounded shadow-inner"
            style={{ minHeight: '2rem' }}
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
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <TimelineItem stop={stop} editMode={true} />
        </Container>
      )}
    </Draggable>
  );
}
