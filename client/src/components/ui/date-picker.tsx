"use client";
import React from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css"; // Change to another theme if needed

interface DatePickerProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date) => void;
}

export function DatePicker({ selectedDate, setSelectedDate }: DatePickerProps) {
  return (
    <Flatpickr
      options={{ dateFormat: "Y-m-d" }}
      value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""}
      onChange={(dates) => {
        if (dates.length > 0) {
          setSelectedDate(dates[0]);
        }
      }}
      className="bg-gray-700 text-white px-4 py-2 rounded-md w-full"
    />
  );
}
