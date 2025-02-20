"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DatePicker } from "@/components/ui/date-picker";
import * as Select from "@radix-ui/react-select";

// Temporary teacher details (Replace with actual backend/cookie values later)
const teacherId = "T12345"; // Replace this with actual backend/cookie data
const teacherName = "John Doe"; // Replace with actual teacher's name

const semesters = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
const branches = [ "ECE","CSE", "IT"];

export default function Attendance() {
  const [date, setDate] = useState(new Date());
  const [subject, setSubject] = useState("");
  const [semester, setSemester] = useState(semesters[0]);
  const [branch, setBranch] = useState(branches[0]);

  // Sample 72 Students with Scholar Number
  const [students, setStudents] = useState(
    Array.from({ length: 72 }, (_, i) => ({
      id: i + 1,
      name: `Student ${i + 1}`,
      scholarNumber: `SCH${1000 + i}`,
      present: false,
    }))
  );

  const toggleAttendance = (id: number) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, present: !student.present } : student
      )
    );
  };

  const saveAttendance = () => {
    console.log("Attendance saved:", {
      date: date.toISOString().split("T")[0],
      teacherId, // Will be fetched dynamically later
      teacherName, // Displayed on UI
      subject,
      semester,
      branch,
      students,
    });

    alert("Attendance saved successfully!");

    // Reset fields
    setSubject("");
    setSemester(semesters[0]);
    setBranch(branches[0]);
    setStudents((prev) => prev.map((student) => ({ ...student, present: false })));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-4 text-white">Attendance Register</h1>

      {/* Display Teacher's Name */}
      <div className="mb-4 text-lg font-semibold text-center text-white">
        <span className="text-gray-400">Teacher:</span> {teacherName}
      </div>

      {/* Subject, Semester & Branch */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Subject Input */}
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="bg-gray-700 text-white p-2 rounded-md w-full"
        />

        {/* Semester Dropdown */}
        <div className="relative">
          <Select.Root value={semester} onValueChange={setSemester}>
            <Select.Trigger className="bg-gray-700 text-white p-2 rounded-md w-full cursor-pointer">
              {semester}
            </Select.Trigger>
            <Select.Content className="absolute z-10 w-64  text-white rounded-md shadow-md mt-1 p-2">
              {semesters.map((sem) => (
                <Select.Item key={sem} value={sem} className="p-2 bg-black hover:bg-gray-900 cursor-pointer">
                  {sem}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </div>
      </div>

      {/* Branch Dropdown */}
      <div className="mb-4">
        <div className="relative">
          <Select.Root value={branch} onValueChange={setBranch}>
            <Select.Trigger className="bg-gray-700 text-white p-2 rounded-md w-full cursor-pointer">
              {branch}
            </Select.Trigger>
            <Select.Content className="absolute z-10 w-64  text-white rounded-md shadow-md mt-1 p-2">
              {branches.map((br) => (
                <Select.Item key={br} value={br} className="p-2  bg-black hover:bg-gray-600 cursor-pointer">
                  {br}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </div>
      </div>

      {/* Date Selector */}
      <div className="flex justify-between items-center mb-4">
        <label className="text-lg text-white">Select Date:</label>
        <DatePicker selectedDate={date} setSelectedDate={setDate} />
      </div>

      {/* Attendance List with Scroll */}
      <ScrollArea className="h-96 bg-gray-900 p-4 rounded-lg border border-gray-700">
        {students.map((student) => (
          <div
            key={student.id}
            className="flex items-center justify-between p-3 border-b border-gray-700"
          >
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-white">{student.name}</span>
              <span className="text-gray-400 text-sm">Scholar No: {student.scholarNumber}</span>
            </div>
            <input
              type="checkbox"
              checked={student.present}
              onChange={() => toggleAttendance(student.id)}
              className="w-5 h-5"
            />
          </div>
        ))}
      </ScrollArea>

      {/* Save Button */}
      <button
        onClick={saveAttendance}
        className="w-full mt-4 bg-blue-500 p-3 rounded-lg hover:bg-blue-600 transition text-white"
      >
        Save Attendance
      </button>
    </div>
  );
}
