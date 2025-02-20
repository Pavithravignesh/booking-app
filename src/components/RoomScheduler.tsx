"use client";

import React, { useEffect, useState } from "react";
import { generateRoomColors } from "@/utils/roomUtils";
import { timeSlots } from "@/utils/timeUtils";
import { Slot, BookingDetails } from "@/types/scheduler";
import TimeHeader from "./scheduler/TimeHeader";
import BookingModal from "./scheduler/BookingModal";

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

    // const handleSlotClick = (roomId: number, time: string) => {
    //     const newSlot = { roomId, time };
    //     const isAlreadySelected = selectedSlots.some(
    //         (slot) => slot.roomId === roomId && slot.time === time
    //     );

    //     if (isAlreadySelected) {
    //         setSelectedSlots(selectedSlots.filter((slot) => !(slot.roomId === roomId && slot.time === time)));
    //     } else {
    //         setSelectedSlots([...selectedSlots, newSlot]);
    //     }
    // };

    const handleConfirmClick = () => {
        if (selectedSlots.length === 0) return;
        setConfirmedSlots([...confirmedSlots, ...selectedSlots]);
        setSelectedSlots([]);
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="shadow-lg border rounded-lg bg-white">
                <div className="border-b p-4 font-bold text-lg">Room Scheduler - {selectedDate}</div>
                <div className="p-4 grid grid-cols-[1fr_repeat(9,1fr)] gap-0">
                    <TimeHeader />
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

            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                bookingDetails={bookingDetails}
                onDelete={handleDeleteSlot}
            />
        </div>
    );
};

export default RoomScheduler; 