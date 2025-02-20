import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WeekSelector = ({ 
    currentDate, 
    onDateSelect, 
    selectedDate,
    setCurrentDate 
}: { 
    currentDate: Date;
    onDateSelect: (date: Date) => void;
    selectedDate: Date | null;
    setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
}) => {

    const getDates = (date: Date): Date[] => {
        const dates: Date[] = [];
        const startDate = new Date(date);
        startDate.setDate(startDate.getDate() - startDate.getDay() + 1); // start by monday

        for (let i = 0; i < 7; i++) {
            dates.push(new Date(startDate));
            startDate.setDate(startDate.getDate() + 1);
        }
        return dates;
    };

    const weekDates = useMemo(() => getDates(currentDate), [currentDate]);
    const isSelected = (date: Date) => selectedDate?.toDateString() === date.toDateString();
    const getDayName = (date: Date): string => date.toLocaleString('default', { weekday: 'short' }).toUpperCase();

    const navigateDays = (direction: 'prev' | 'next') => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() + (direction === 'prev' ? -7 : 7));
            return newDate;
        });

    };

    return (
        <div className="flex items-center gap-2">
            <button onClick={() => navigateDays('prev')} className="p-2 hover:bg-gray-200 rounded-full">
                <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-1">
                {weekDates.map(date => (
                    <button key={date.toISOString()} onClick={() => onDateSelect(date)}
                        className={`flex flex-col items-center p-2 rounded-lg transition-colors min-w-[50px]
                        ${isSelected(date) ? 'bg-red-500 text-white' : 'hover:bg-gray-100'}`}>
                        <span className="text-xs font-medium">{getDayName(date)}</span>
                        <span className="text-base font-bold">{date.getDate()}</span>
                    </button>
                ))}
            </div>
            <button onClick={() => navigateDays('next')} className="p-2 hover:bg-gray-200 rounded-full">
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
};

export default WeekSelector;
