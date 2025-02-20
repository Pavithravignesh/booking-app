"use client";

import { useState} from "react";
import MonthYearSelector from "./MonthYearSelector";
import WeekSelector from "./WeekSelector";

interface DateSelectorProps {
    onDateSelect?: (date: Date) => void;
}

const DateSelector = ({ onDateSelect }: DateSelectorProps) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const handleDateSelect = (date: Date) => {
        const day = date.getDay();
        if (day === 0 || day === 6) {
            alert("Saturday and Sunday are holidays!");
        }
        setSelectedDate(date);
        if (onDateSelect) {
            onDateSelect(date);
        }
    };

    return (
        <div className="w-full pb-4">
            <div className="flex items-center justify-between px-8 w-full">
                {/* LEFT - Month Selector */}
                <div>
                    <MonthYearSelector currentDate={currentDate} setCurrentDate={setCurrentDate} />
                </div>

                {/* RIGHT - Week Selector */}
                <div>
                    <WeekSelector
                        currentDate={currentDate}
                        onDateSelect={handleDateSelect}
                        selectedDate={selectedDate}
                        setCurrentDate={setCurrentDate}
                    />
                </div>
            </div>
        </div>
    );
};

export default DateSelector;