"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MonthYearSelector = ({ currentDate, setCurrentDate }: { currentDate: Date, setCurrentDate: React.Dispatch<React.SetStateAction<Date>> }) => {
    const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
    const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

    // Reference for detecting clicks outside
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsMonthDropdownOpen(false);
                setIsYearDropdownOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const months = useMemo(() => Array.from({ length: 12 }, (_, i) => {
        const date = new Date();
        date.setMonth(i);
        return date.toLocaleString('default', { month: 'short' }).toUpperCase();
    }), []);

    const years = useMemo(() => Array.from({ length: 11 }, (_, i) => currentDate.getFullYear() - 5 + i), [currentDate]);

    return (
        <div className="flex items-center gap-2 relative" ref={dropdownRef}>
            <button onClick={() => setCurrentDate(prev => new Date(prev.setMonth(prev.getMonth() - 1)))}
                className="p-1 hover:bg-gray-100 rounded-full">
                <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex gap-1 relative">
                {/* Month Selector */}
                <button onClick={(e) => { e.stopPropagation(); setIsMonthDropdownOpen(prev => !prev); }}
                    className="text-lg font-semibold hover:bg-gray-100 px-2 rounded">
                    {currentDate.toLocaleString('default', { month: 'short' }).toUpperCase()}
                </button>

                {/* Year Selector */}
                <button onClick={(e) => { e.stopPropagation(); setIsYearDropdownOpen(prev => !prev); }}
                    className="text-lg font-semibold hover:bg-gray-100 px-2 rounded">
                    {currentDate.getFullYear()}
                </button>

                {/* Month Dropdown */}
                {isMonthDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg z-10 grid grid-cols-3 gap-1 p-2 min-w-[150px] w-max max-w-[200px]">
                        {months.map((month, index) => (
                            <button key={month} onClick={() => {
                                setCurrentDate(prev => new Date(prev.setMonth(index)));
                                setIsMonthDropdownOpen(false); // Close after selection
                            }}
                                className="px-3 py-2 hover:bg-gray-100 rounded text-sm w-full text-center truncate">
                                {month}
                            </button>
                        ))}
                    </div>
                )}

                {/* Year Dropdown */}
                {isYearDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg z-10 w-24 max-h-48 overflow-y-auto">
                        {years.map(year => (
                            <button key={year} onClick={() => {
                                setCurrentDate(prev => new Date(prev.setFullYear(year)));
                                setIsYearDropdownOpen(false); // Close after selection
                            }}
                                className="w-full px-3 py-2 hover:bg-gray-100 text-left text-sm">
                                {year}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <button onClick={() => setCurrentDate(prev => new Date(prev.setMonth(prev.getMonth() + 1)))}
                className="p-1 hover:bg-gray-100 rounded-full">
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
};

export default MonthYearSelector;
