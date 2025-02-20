import prisma from "../../../server.js";

export const subjectResolvers = {
  Query: {
    subjects: async () => prisma.subject.findMany(),
    subject: async (_: unknown, { id }: { id: string }) =>
      prisma.subject.findUnique({ where: { id } }),
  },
  Mutation: {
    createSubject: async (_: unknown, { name, subjectcode }: { name: string; subjectcode: string }) => {
      return prisma.subject.create({
        data: { name, subjectcode },
      });
    },
  },
};
