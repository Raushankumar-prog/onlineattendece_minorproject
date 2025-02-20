"use client";
import React from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css"; // Change to another theme if needed

export function DatePicker({ selectedDate, setSelectedDate }: { selectedDate: Date; setSelectedDate: (date: Date) => void }) {
  return (
    <Flatpickr
      options={{ dateFormat: "Y-m-d" }}
      value={selectedDate}
      onChange={(dates) => setSelectedDate(dates[0])}
      className="bg-gray-700 text-white px-4 py-2 rounded-md w-full"
    />
  );
}
