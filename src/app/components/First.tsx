"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// Error: The 'lucide-react' package needs to be installed first
// Run: npm install lucide-react
// Or: yarn add lucide-react

interface DateSelectorProps {
    onDateSelect?: (date: Date) => void;
}

const DateSelector = ({ onDateSelect }: DateSelectorProps) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
    const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

    // Function to get array of dates for display
    const getDates = (date: Date): Date[] => {
        const dates: Date[] = [];
        const startDate = new Date(date);

        for (let i = 0; i < 7; i++) {
            const newDate = new Date(startDate);
            dates.push(newDate);
            startDate.setDate(startDate.getDate() + 1);
        }
        return dates;
    };

    // Navigate days
    const navigateDays = (direction: 'prev' | 'next') => {
        const newDate = new Date(currentDate);
        if (direction === 'prev') {
            newDate.setDate(newDate.getDate() - 7);
        } else {
            newDate.setDate(newDate.getDate() + 7);
        }
        setCurrentDate(newDate);
    };

    // Navigate month/year
    const navigateMonth = (direction: 'prev' | 'next') => {
        const newDate = new Date(currentDate);
        if (direction === 'prev') {
            newDate.setMonth(newDate.getMonth() - 1);
        } else {
            newDate.setMonth(newDate.getMonth() + 1);
        }
        setCurrentDate(newDate);
    };

    // Format month
    const formatMonth = (date: Date): string => {
        return date.toLocaleString('default', { month: 'short' }).toUpperCase();
    };

    // Get day name
    const getDayName = (date: Date): string => {
        return date.toLocaleString('default', { weekday: 'short' }).toUpperCase();
    };

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        onDateSelect?.(date);
    };

    const isSelected = (date: Date) => {
        return selectedDate?.toDateString() === date.toDateString();
    };

    // Add these new functions
    const months = Array.from({ length: 12 }, (_, i) => {
        const date = new Date();
        date.setMonth(i);
        return date.toLocaleString('default', { month: 'short' }).toUpperCase();
    });

    const years = Array.from({ length: 11 }, (_, i) => 
        currentDate.getFullYear() - 5 + i
    );

    const handleMonthSelect = (monthIndex: number) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(monthIndex);
        setCurrentDate(newDate);
        setIsMonthDropdownOpen(false);
    };

    const handleYearSelect = (year: number) => {
        const newDate = new Date(currentDate);
        newDate.setFullYear(year);
        setCurrentDate(newDate);
        setIsYearDropdownOpen(false);
    };

    return (
        <div className="w-full border-b pb-4">
            <div className="flex items-center justify-between">
                {/* Left side - Month/Year Navigation */}
                <div className="flex items-center gap-2 relative">
                    <button
                        onClick={() => navigateMonth('prev')}
                        className="p-1 hover:bg-gray-100 rounded-full"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="flex gap-1">
                        <button
                            onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
                            className="text-lg font-semibold hover:bg-gray-100 px-2 rounded"
                        >
                            {formatMonth(currentDate)}
                        </button>
                        
                        <button
                            onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
                            className="text-lg font-semibold hover:bg-gray-100 px-2 rounded"
                        >
                            {currentDate.getFullYear()}
                        </button>
                    </div>

                    {/* Month Dropdown */}
                    {isMonthDropdownOpen && (
                        <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg z-10 grid grid-cols-3 gap-1 p-2">
                            {months.map((month, index) => (
                                <button
                                    key={month}
                                    onClick={() => handleMonthSelect(index)}
                                    className="px-3 py-2 hover:bg-gray-100 rounded text-sm"
                                >
                                    {month}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Year Dropdown */}
                    {isYearDropdownOpen && (
                        <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg z-10 w-24 max-h-48 overflow-y-auto">
                            {years.map((year) => (
                                <button
                                    key={year}
                                    onClick={() => handleYearSelect(year)}
                                    className="w-full px-3 py-2 hover:bg-gray-100 text-left text-sm"
                                >
                                    {year}
                                </button>
                            ))}
                        </div>
                    )}

                    <button
                        onClick={() => navigateMonth('next')}
                        className="p-1 hover:bg-gray-100 rounded-full"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Right side - Days Navigation */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => navigateDays('prev')}
                        className="p-1 hover:bg-gray-100 rounded-full"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="flex gap-1">
                        {getDates(currentDate).map((date) => (
                            <button
                                key={date.toISOString()}
                                onClick={() => handleDateSelect(date)}
                                className={`flex flex-col items-center p-1 rounded-lg transition-colors min-w-[60px]
                  ${isSelected(date)
                                        ? 'bg-red-500 text-white'
                                        : 'hover:bg-gray-100'
                                    }`}
                            >
                                <span className="text-xs font-medium">{getDayName(date)}</span>
                                <span className="text-base font-bold">{date.getDate()}</span>
                                <span className="text-xs">{formatMonth(date)}</span>
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => navigateDays('next')}
                        className="p-1 hover:bg-gray-100 rounded-full"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DateSelector;