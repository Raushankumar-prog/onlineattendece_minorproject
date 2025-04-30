"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_SUBJECT } from "@/graphql/queries/getsubject";
import { DatePicker } from "@/components/ui/date-picker";
import { ScrollArea } from "@/components/ui/scroll-area";
import * as Select from "@radix-ui/react-select";
import * as Dialog from "@radix-ui/react-dialog";
import { CheckCircle2, X } from "lucide-react";

// TypeScript Interfaces
interface Student {
  id: number;
  name: string;
  scholarNumber: string;
  present: boolean;
}

interface Subject {
  id: string;
  name: string;
}

const teacherId = "T12345";
const teacherName = "Dr. Neha singh";

const semesters = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
const branches = ["ECE", "CSE", "IT"];

export default function Attendance() {
  const [date, setDate] = useState<Date>(new Date());
  const [subject, setSubject] = useState<string>("");
  const [semester, setSemester] = useState<string>(semesters[0]);
  const [branch, setBranch] = useState<string>(branches[0]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { data, loading, error } = useQuery<{ subjects: Subject[] }>(GET_SUBJECT);

  useEffect(() => {
    if (data?.subjects?.length) {
      setSubject(data.subjects[0].name);
    }
  }, [data]);

  const [students, setStudents] = useState<Student[]>(
    Array.from({ length: 72 }, (_, i) => ({
      id: i + 1,
      name: `Student ${i + 1}`,
      scholarNumber: `SCH${1000 + i}`,
      present: true, // ✅ Everyone present by default
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
      teacherId,
      teacherName,
      subject,
      semester,
      branch,
      students,
    });

    setOpenModal(true);

    // Reset selections except date and subject
    setSemester(semesters[0]);
    setBranch(branches[0]);
    setStudents((prev) => prev.map((s) => ({ ...s, present: true })));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-4 text-white">Attendance Register</h1>

      <div className="mb-4 text-lg font-semibold text-center text-white">
        <span className="text-gray-400">Teacher:</span> {teacherName}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Subject Dropdown */}
        <Select.Root value={subject} onValueChange={setSubject} disabled={loading || !!error}>
          <Select.Trigger className="bg-gray-700 text-white p-2 rounded-md w-full cursor-pointer">
            <Select.Value placeholder={loading ? "Loading..." : error ? "Error loading" : "Select Subject"} />
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="bg-gray-900 border border-gray-700 rounded-md shadow-lg">
              <Select.Viewport className="p-2">
                {data?.subjects?.map((sub) => (
                  <Select.Item key={sub.id} value={sub.name} className="p-2 bg-black hover:bg-gray-900 cursor-pointer">
                    <Select.ItemText>{sub.name}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>

        {/* Semester Dropdown */}
        <Select.Root value={semester} onValueChange={setSemester}>
          <Select.Trigger className="bg-gray-700 text-white p-2 rounded-md w-full cursor-pointer">
            <Select.Value />
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="bg-gray-900 border border-gray-700 rounded-md shadow-lg">
              <Select.Viewport className="p-2">
                {semesters.map((sem) => (
                  <Select.Item key={sem} value={sem} className="p-2 bg-black hover:bg-gray-900 cursor-pointer">
                    <Select.ItemText>{sem}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      {/* Branch Dropdown */}
      <div className="mb-4">
        <Select.Root value={branch} onValueChange={setBranch}>
          <Select.Trigger className="bg-gray-700 text-white p-2 rounded-md w-full cursor-pointer">
            <Select.Value />
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="bg-gray-900 border border-gray-700 rounded-md shadow-lg">
              <Select.Viewport className="p-2">
                {branches.map((br) => (
                  <Select.Item key={br} value={br} className="p-2 bg-black hover:bg-gray-600 cursor-pointer">
                    <Select.ItemText>{br}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      {/* Date Picker */}
      <div className="flex justify-between items-center mb-4">
        <label className="text-lg text-white">Select Date:</label>
        <DatePicker selectedDate={date} setSelectedDate={setDate} />
      </div>

      {/* Student List */}
      <ScrollArea className="h-96 bg-gray-900 p-4 rounded-lg border border-gray-700">
        {students.map((student) => (
          <div key={student.id} className="flex items-center justify-between p-3 border-b border-gray-700">
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-white">{student.name}</span>
              <span className="text-gray-400 text-sm">Scholar No: {student.scholarNumber}</span>
            </div>
            <input
              type="checkbox"
              checked={student.present}
              onChange={() => toggleAttendance(student.id)}
              className="w-5 h-5 accent-blue-500"
            />
          </div>
        ))}
      </ScrollArea>

      <button
        onClick={saveAttendance}
        className="w-full mt-4 bg-blue-500 p-3 rounded-lg hover:bg-blue-600 transition text-white"
      >
        Save Attendance
      </button>

      {/* Success Modal */}
      <Dialog.Root open={openModal} onOpenChange={setOpenModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
          <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title asChild>
                <h2 className="text-xl font-bold text-green-600 flex items-center gap-2">
                  <CheckCircle2 className="text-green-500" />
                  Success
                </h2>
              </Dialog.Title>
              <button onClick={() => setOpenModal(false)}>
                <X className="w-5 h-5 text-gray-400 hover:text-red-500" />
              </button>
            </div>
            <p className="text-white">Attendance saved successfully!</p>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
