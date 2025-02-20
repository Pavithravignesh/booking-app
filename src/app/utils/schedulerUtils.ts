export const generateTimeSlots = (start = 9, end = 17) =>
  Array.from({ length: end - start + 1 }, (_, i) => `${start + i}:00`);

export const generateRoomColors = (count: number) => {
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