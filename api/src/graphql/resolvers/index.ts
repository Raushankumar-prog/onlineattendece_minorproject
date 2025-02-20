
import { attendanceResolvers } from "./Attendance/attendance.resolver.js";
import { studentResolvers } from "./Student/student.reolver.js";
import { subjectResolvers } from "./Subject/subject.resolver.js";
import { teacherResolvers } from "./Teacher/teacher.resolver.js";
import { teacherSubjectResolvers } from "./TeacherSubject/teachersubject.resolver.js";
import { studentSubjectResolvers } from "./StudentSubject/studentsubject.resolver.js";
import { resetresolvers } from "./reset.resolver/reset.resolver.js";

export const resolvers = [
  attendanceResolvers,
  studentResolvers,
  subjectResolvers,
  teacherResolvers,
  teacherSubjectResolvers,
  studentSubjectResolvers,
  resetresolvers
];
