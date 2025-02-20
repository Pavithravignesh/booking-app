import React from 'react';
import { Room, Slot } from '../types/scheduler';

interface TimeSlotGridProps {
  rooms: Room[];
  timeSlots: string[];
  selectedSlots: Slot[];
  confirmedSlots: Slot[];
  onSlotClick: (roomId: number, time: string) => void;
  onConfirmedSlotClick: (roomId: number, time: string) => void;
}

const TimeSlotGrid = ({
  rooms,
  timeSlots,
  selectedSlots,
  confirmedSlots,
  onSlotClick,
  onConfirmedSlotClick,
}: TimeSlotGridProps) => {
  return (
    <div className="p-4 grid grid-cols-[1fr_repeat(9,1fr)] gap-0">
      <div className="col-span-1"></div>
      {timeSlots.map((time, index) => (
        <div key={index} className="text-center text-sm font-semibold text-gray-800 border-b border-gray-300 py-2">
          {time}
        </div>
      ))}

      {rooms.map((room) => (
        <React.Fragment key={room.id}>
          <div className="col-span-1 flex items-center text-base font-medium text-gray-700 border-r border-gray-300">
            {room.name}
          </div>
          {timeSlots.map((time) => {
            const isSelected = selectedSlots.some((slot) => slot.roomId === room.id && slot.time === time);
            const isConfirmed = confirmedSlots.some((slot) => slot.roomId === room.id && slot.time === time);
            return (
              <div
                key={`${room.id}-${time}`}
                className={`h-14 border border-gray-300 cursor-pointer relative transition ${
                  isConfirmed ? "bg-gray-600 text-white" : isSelected ? room.color : "hover:bg-gray-100"
                }`}
                onClick={() => (isConfirmed ? onConfirmedSlotClick(room.id, time) : onSlotClick(room.id, time))}
              />
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

export default TimeSlotGrid; 