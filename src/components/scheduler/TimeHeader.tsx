import { timeSlots } from '@/utils/timeUtils';

const TimeHeader = () => (
  <>
    <div className="col-span-1"></div>
    {timeSlots.map((time, index) => (
      <div key={index} className="text-center text-sm font-semibold text-gray-800 border-b border-gray-300 py-2">
        {time}
      </div>
    ))}
  </>
);

export default TimeHeader; 