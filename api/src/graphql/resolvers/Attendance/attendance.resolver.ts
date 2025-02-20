import prisma from "../../../server.js";

export const attendanceResolvers = {
  Query: {
   attendances: async (_: any, args: { semester?: string; branch?: string }) => {
      return await prisma.attendance.findMany({
        where: {
          student: {
            semester: args.semester,
            branch: args.branch,
          },
        },
        include: {
          student: true,
          teacher: true,
          subject: true,
        },
      });
    },


    attendance: async (_: any, { id }: { id: string }) =>
      await prisma.attendance.findUnique({
        where: { id },
        include: {
          student: true, 
          teacher: true,
          subject: true,
        },
      }),
  },

  Mutation: {
    createAttendance: async (_: any, { studentId, subjectId, teacherId, date, status }: any) => {
   
      const studentExists = await prisma.student.findUnique({ where: { id: studentId } });
      const subjectExists = await prisma.subject.findUnique({ where: { id: subjectId } });
      const teacherExists = await prisma.teacher.findUnique({ where: { id: teacherId } });

      if (!studentExists || !subjectExists || !teacherExists) {
        throw new Error("Invalid student, subject, or teacher ID.");
      }

      return await prisma.attendance.create({
        data: {
          studentId,
          subjectId,
          teacherId,
          date,
          status,
        },
        include: {
          student: true,
          subject: true,
          teacher: true,
        },
      });
    },
  },
};
