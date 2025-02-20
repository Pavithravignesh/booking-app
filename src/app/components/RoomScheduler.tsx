"use client";

import React, { useEffect, useState } from "react";

const generateTimeSlots = (start = 9, end = 17) =>
  Array.from({ length: end - start + 1 }, (_, i) => `${start + i}:00`);
const timeSlots = generateTimeSlots();

const generateRoomColors = (count: number) => {
  const colors = [
    "bg-red-400", "bg-green-400", "bg-blue-400", "bg-yellow-400", "bg-purple-400",
    "bg-pink-400", "bg-indigo-400", "bg-teal-400", "bg-orange-400", "bg-cyan-400"
  ];
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Room ${String.fromCharCode(65 + i)}`,
    color: colors[i % colors.length],
  }));
};

interface Slot {
  roomId: number;
  time: string;
}

interface BookingDetails {
  room: string;
  startTime: string;
  endTime: string;
}

const RoomScheduler = ({ roomsCount, selectedDate }: { roomsCount: number; selectedDate: string }) => {
  const rooms = generateRoomColors(roomsCount);
  const [selectedSlots, setSelectedSlots] = useState<Slot[]>([]);
  const [confirmedSlots, setConfirmedSlots] = useState<Slot[]>([]);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedBookings = localStorage.getItem(`confirmedBookings_${selectedDate}`);
    if (savedBookings) {
      setConfirmedSlots(JSON.parse(savedBookings));
    } else {
      setConfirmedSlots([]);
    }
  }, [selectedDate]);

  useEffect(() => {
    localStorage.setItem(`confirmedBookings_${selectedDate}`, JSON.stringify(confirmedSlots));
  }, [confirmedSlots, selectedDate]);

  const handleSlotClick = (roomId: number, time: string) => {
    const newSlot = { roomId, time };
    const isAlreadySelected = selectedSlots.some(
      (slot) => slot.roomId === roomId && slot.time === time
    );

    if (isAlreadySelected) {
      setSelectedSlots(selectedSlots.filter((slot) => !(slot.roomId === roomId && slot.time === time)));
    } else {
      setSelectedSlots([...selectedSlots, newSlot]);
    }
  };

  const handleConfirmClick = () => {
    if (selectedSlots.length === 0) return;
    setConfirmedSlots([...confirmedSlots, ...selectedSlots]);
    setSelectedSlots([]);
  };

  const handleConfirmedSlotClick = (roomId: number, time: string) => {
    const booking = confirmedSlots.find((slot) => slot.roomId === roomId && slot.time === time);
    if (booking) {
      setBookingDetails({
        room: rooms.find((r) => r.id === booking.roomId)?.name || "Unknown Room",
        startTime: booking.time,
        endTime: `${parseInt(booking.time) + 1}:00`,
      });
      setIsModalOpen(true);
    }
  };

  const handleDeleteSlot = () => {
    if (bookingDetails) {
      setConfirmedSlots(
        confirmedSlots.filter((slot) =>
          slot.time !== bookingDetails.startTime ||
          slot.roomId !== rooms.find(r => r.name === bookingDetails.room)?.id
        )
      );
    }
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="shadow-lg border rounded-lg bg-white">
        <div className="border-b p-4 font-bold text-lg">Room Scheduler - {selectedDate}</div>
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
                    className={`h-14 border border-gray-300 cursor-pointer relative transition ${isConfirmed ? "bg-gray-600 text-white" : isSelected ? room.color : "hover:bg-gray-100"
                      }`}
                    onClick={() => (isConfirmed ? handleConfirmedSlotClick(room.id, time) : handleSlotClick(room.id, time))}
                  />
                );
              })}
            </React.Fragment>
          ))}
        </div>

        <div className="p-4 flex justify-end">
          <button
            onClick={handleConfirmClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 disabled:opacity-50"
            disabled={selectedSlots.length === 0}
          >
            Confirm
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-80"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-4">Booking Details</h2>
            {bookingDetails && (
              <div className="mb-4 text-sm">
                <p><strong>Room:</strong> {bookingDetails.room}</p>
                <p><strong>Start Time:</strong> {bookingDetails.startTime}</p>
                <p><strong>End Time:</strong> {bookingDetails.endTime}</p>
              </div>
            )}
            <div className="flex justify-end">
              <button
                onClick={handleDeleteSlot}
                className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomScheduler;