export interface Slot {
  roomId: number;
  time: string;
}

export interface BookingDetails {
  room: string;
  startTime: string;
  endTime: string;
}

export interface Room {
  id: number;
  name: string;
  color: string;
} 