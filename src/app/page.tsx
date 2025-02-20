"use client"

import { useState, useEffect } from "react";
import DateSelector from "./components/DateSelector";
import RoomScheduler from "./components/RoomScheduler";
import RoomCountSelector from "./components/RoomCountSelector";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [roomsCount, setRoomsCount] = useState(3);

  useEffect(() => {
    const stored = localStorage.getItem('roomsCount');
    if (stored) {
      setRoomsCount(parseInt(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('roomsCount', roomsCount.toString());
  }, [roomsCount]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Room Booking Scheduler</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <div className="flex flex-col space-y-4 mb-2">
          <div className="ml-[45px] mt-[10px]">
            <RoomCountSelector roomsCount={roomsCount} onRoomCountChange={setRoomsCount} />
          </div>
          <DateSelector onDateSelect={setSelectedDate} />
          <RoomScheduler
            roomsCount={roomsCount}
            selectedDate={selectedDate ? selectedDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
          />
        </div>

      </div>
    </div>
  );
}