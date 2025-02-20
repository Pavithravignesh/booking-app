"use client";

interface RoomCountSelectorProps {
    roomsCount: number;
    onRoomCountChange: (count: number) => void;
}

const RoomCountSelector = ({ roomsCount, onRoomCountChange }: RoomCountSelectorProps) => {
    return (
        <div className="flex items-center gap-2 mb-4">
            <label htmlFor="roomCount" className="text-gray-700 font-medium">
                Number of Rooms:
            </label>
            <input
                id="roomCount"
                type="number"
                min="1"
                max="20"
                value={roomsCount}
                onChange={(e) => onRoomCountChange(Math.max(1, parseInt(e.target.value) || 1))}
                className="border rounded px-2 py-1 w-20 text-center"
            />
        </div>
    );
};

export default RoomCountSelector; 