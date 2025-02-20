export const ROOM_COLORS = [
  "bg-red-400", "bg-green-400", "bg-blue-400", "bg-yellow-400", "bg-purple-400",
  "bg-pink-400", "bg-indigo-400", "bg-teal-400", "bg-orange-400", "bg-cyan-400"
];

export const generateRoomColors = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Room ${String.fromCharCode(65 + i)}`,
    color: ROOM_COLORS[i % ROOM_COLORS.length],
  }));
};

export interface Room {
  id: number;
  name: string;
  color: string;
} 