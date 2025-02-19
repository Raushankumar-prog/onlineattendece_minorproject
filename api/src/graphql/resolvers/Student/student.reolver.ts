import prisma from "../../../server.js";


export const studentResolvers = {
  Query: {
    students: async () => await prisma.student.findMany(),
    student: async (_: any, { id }: { id: string }) =>
      await prisma.student.findUnique({ where: { id } }),
  },
  Mutation: {
    createStudent: async (_: any, { data }: any) =>
      await prisma.student.create({ data }),
  },
};