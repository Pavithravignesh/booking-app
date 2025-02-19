"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { GripHorizontal, X } from 'lucide-react';

// Sample data for rooms and bookings
const rooms = [
  { id: 1, name: 'Conference Room A' },
  { id: 2, name: 'Meeting Room B' },
  { id: 3, name: 'Board Room C' },
];

const generateTimeSlots = () => {
  const slots = [];
  for (let i = 9; i <= 17; i++) {
    slots.push(`${i}:00`);
  }
  return slots;
};

const timeSlots = generateTimeSlots();

const getCurrentWeekDates = () => {
  const dates = [];
  const today = new Date();
  const firstDay = new Date(today.setDate(today.getDate() - today.getDay()));

  for (let i = 0; i < 7; i++) {
    const date = new Date(firstDay);
    date.setDate(firstDay.getDate() + i);
    dates.push(date);
  }
  return dates;
};

interface SlotType {
  roomId: number;
  date: Date;
  time: string;
}

interface BookingDetails {
  room: string;
  date: string;
  startTime: string;
  endTime: string;
}

const RoomScheduler = () => {
  const [weekDates] = useState(getCurrentWeekDates());
  const [selectedSlot, setSelectedSlot] = useState<SlotType | null>(null);
  const [draggingBooking, setDraggingBooking] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

  const handleSlotClick = (roomId: number, date: Date, time: string) => {
    setSelectedSlot({ roomId, date, time });
    setBookingDetails({
      room: rooms.find(r => r.id === roomId)?.name ?? 'Unknown Room',
      date: date.toLocaleDateString(),
      startTime: time,
      endTime: `${parseInt(time) + 1}:00`
    });
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, details: BookingDetails) => {
    setDraggingBooking(true);
    e.dataTransfer.setData('text/plain', JSON.stringify(details));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, roomId: number, date: Date, time: string) => {
    e.preventDefault();
    setDraggingBooking(false);
    const details = JSON.parse(e.dataTransfer.getData('text/plain'));
    setBookingDetails({
      ...details,
      room: rooms.find(r => r.id === roomId)?.name ?? 'Unknown Room',
      date: date.toLocaleDateString(),
      startTime: time,
      endTime: `${parseInt(time) + 1}:00`
    });
    setShowSummary(true);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Card className="shadow-lg">
        <CardHeader className="border-b">
          <CardTitle>Room Scheduler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-6 grid grid-cols-8 gap-4">
            {/* Time slots column */}
            <div className="col-span-1">
              <div className="h-14 mb-2"></div>
              {rooms.map(room => (
                <div key={room.id} className="h-14 flex items-center font-normal text-sm text-gray-700">
                  {room.name}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            {weekDates.map((date, dateIndex) => (
              <div key={dateIndex} className="col-span-1">
                <div className="h-14 mb-2 font-normal text-center text-gray-800">
                  {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </div>
                {rooms.map(room => (
                  <div key={`${room.id}-${dateIndex}`} className="relative">
                    {timeSlots.map((time, timeIndex) => (
                      <div
                        key={`${room.id}-${dateIndex}-${timeIndex}`}
                        className="h-14 border border-gray-200 cursor-pointer transition-colors hover:bg-gray-50"
                        onClick={() => handleSlotClick(room.id, date, time)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, room.id, date, time)}
                      >
                        {selectedSlot?.roomId === room.id &&
                          selectedSlot?.date.getTime() === date.getTime() &&
                          selectedSlot?.time === time && (
                            <div
                              draggable
                              className="absolute w-full h-14 bg-blue-100 border border-blue-300 rounded-md flex items-center justify-between px-3 shadow-sm transition-transform hover:scale-[1.02]"
                              onDragStart={(e) => bookingDetails && handleDragStart(e, bookingDetails)}
                            >
                              <span className="text-sm font-normal text-blue-700">Booking</span>
                              <GripHorizontal className="h-4 w-4 text-blue-600 cursor-move" />
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Booking Summary Modal */}
      {showSummary && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="w-[400px] shadow-xl">
            <CardHeader>
              <div className="flex flex-row items-center justify-between border-b">
                <CardTitle>Booking Summary</CardTitle>
                <button 
                  onClick={() => setShowSummary(false)} 
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="p-6 space-y-5">
                {/* Summary Details */}
                <div className="space-y-4">
                  <div>
                    <p className="font-normal text-gray-700 mb-1">Room</p>
                    <p className="text-gray-600">{bookingDetails?.room}</p>
                  </div>
                  <div>
                    <p className="font-normal text-gray-700 mb-1">Date</p>
                    <p className="text-gray-600">{bookingDetails?.date}</p>
                  </div>
                  <div>
                    <p className="font-normal text-gray-700 mb-1">Time</p>
                    <p className="text-gray-600">{bookingDetails?.startTime} - {bookingDetails?.endTime}</p>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    onClick={() => setShowSummary(false)}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // Handle confirmation here
                      setShowSummary(false);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RoomScheduler;