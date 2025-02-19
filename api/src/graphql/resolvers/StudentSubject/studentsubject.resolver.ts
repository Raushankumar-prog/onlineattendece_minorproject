import prisma from "../../../server.js";

export const studentSubjectResolvers = {
  Query: {
    studentSubjects: async () => await prisma.studentSubject.findMany(),
  },
};
