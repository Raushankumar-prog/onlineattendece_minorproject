import prisma from "../../../server.js";


export const teacherResolvers = {
  Query: {
    teachers: async () => await prisma.teacher.findMany(),
    teacher: async (_: any, { id }: { id: string }) =>
      await prisma.teacher.findUnique({ where: { id } }),
  },
  Mutation: {
    createTeacher: async (_: any, { data }: any) =>
      await prisma.teacher.create({ data }),
  },
};
