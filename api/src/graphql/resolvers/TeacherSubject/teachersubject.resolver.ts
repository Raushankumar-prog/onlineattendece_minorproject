import prisma from "../../../server.js";

export const teacherSubjectResolvers = {
  Query: {
    teacherSubjects: async () => await prisma.teacherSubject.findMany(),
  },
};