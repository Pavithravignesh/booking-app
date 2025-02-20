import { BookingDetails } from '@/types/scheduler';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails: BookingDetails | null;
  onDelete: () => void;
}

const BookingModal = ({ isOpen, onClose, bookingDetails, onDelete }: BookingModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
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
            onClick={onDelete}
            className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal; 