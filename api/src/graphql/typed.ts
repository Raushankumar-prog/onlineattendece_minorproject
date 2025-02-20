import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Teacher {
    id: ID!
    name: String
    email: String!
    password: String
    googleId: String
    subjects: [TeacherSubject!]
    students: [Student!]
    attendance: [Attendance!]
    createdAt: String!
  }

  type Student {
    id: ID!
    name: String
    scholarnumber: String!
    semester: String!
    branch:String!
    password: String
    googleId: String
    email: String!
    teachers: [Teacher!]
    subjects: [StudentSubject!]
    attendance: [Attendance!]
    createdAt: String!
  }

  type Subject {
    id: ID!
    name: String!
    teachers: [TeacherSubject!]
    students: [StudentSubject!]
    attendance: [Attendance!]
  }

  type TeacherSubject {
    id: ID!
    teacher: Teacher!
    subject: Subject!
  }

  type StudentSubject {
    id: ID!
    student: Student!
    subject: Subject!
  }

  type Attendance {
    id: ID!
    student: Student!
    subject: Subject!
    teacher: Teacher!
    date: String!
    status: AttendanceStatus!
  }

  enum AttendanceStatus {
    PRESENT
    ABSENT
    LATE
  }

  type Query {
    teachers: [Teacher!]
    teacher(id: ID!): Teacher
    students(semester: String, branch: String): [Student!]
    student(id: ID!): Student
    subjects: [Subject!]
    subject(id: ID!): Subject
    teacherSubjects: [TeacherSubject!]
    studentSubjects: [StudentSubject!]
    attendances(semester: String, branch: String): [Attendance!]!
    attendance(id: ID!): Attendance
  }

  type AuthPayloadStudent {
  token: String!
  student: Student!
} 

 type AuthPayloadTeacher {
  token: String!
  student: Student!
} 

  type Mutation {
    createTeacher(name: String!, email: String!, password: String, googleId: String): Teacher!
    createStudent(name: String!, scholarnumber: String!, email: String!, password: String, googleId: String,semester:String!,branch:String!): Student!
    createAttendance(studentId: ID!, subjectId: ID!, teacherId: ID!, date: String!, status: AttendanceStatus!): Attendance!
    loginTeacher(email: String!, password: String, googleId: String): AuthPayloadTeacher!
    loginStudent(email: String!, password: String, googleId: String): AuthPayloadStudent!
    sendResetCode(email: String!): Boolean!
    verifyResetCode(email: String!, code: String!): Boolean!
    resetTeacherPassword(email: String!, newPassword: String!): Boolean!
    resetStudentPassword(email: String!, newPassword: String!): Boolean!
  }
`;
