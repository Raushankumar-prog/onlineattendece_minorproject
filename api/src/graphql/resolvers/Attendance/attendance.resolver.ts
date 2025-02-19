import prisma from "../../../server.js";

export const attendanceResolvers = {
  Query: {
    attendances: async () => await prisma.attendance.findMany(),
    attendance: async (_: any, { id }: { id: string }) =>
      await prisma.attendance.findUnique({ where: { id } }),
  },
  Mutation: {
    createAttendance: async (_: any, { data }: any) =>
      await prisma.attendance.create({ data }),
  },
};

