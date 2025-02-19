import prisma from "../../../server.js";

export const subjectResolvers = {
  Query: {
    subjects: async () => await prisma.subject.findMany(),
    subject: async (_: any, { id }: { id: string }) =>
      await prisma.subject.findUnique({ where: { id } }),
  },
};