export const generateTimeSlots = (start = 9, end = 17) =>
  Array.from({ length: end - start + 1 }, (_, i) => `${start + i}:00`);

export const timeSlots = generateTimeSlots(); 