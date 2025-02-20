import prisma from "../../../server.js";
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken";


export const teacherResolvers = {
  Query: {
    teachers: async () => await prisma.teacher.findMany(),
    teacher: async (_: any, { id }: { id: string }) =>
      await prisma.teacher.findUnique({ where: { id } }),
  },
  Mutation: {
    createTeacher: async (
      _: any,
      args: { email: string; name: string;  password?: string; googleId?: string ; sem  }
    ) => {
      const existingTeacher = await prisma.teacher.findUnique({ where: { email: args.email } });
      if (existingTeacher) {
        throw new Error("Teacher already exists with this email");
      }

      let hashedPassword = args.password ? await bcrypt.hash(args.password, 10) : null;

      return prisma.teacher.create({
        data: {
          email: args.email,
          name: args.name,
          
          password: hashedPassword ?? null,
          googleId: args.googleId ?? null,
        },
      });
    },
    loginTeacher: async (_: any, args: { email: string; password?: string; googleId?: string }) => {
      const teacher = await prisma.teacher.findUnique({ where: { email: args.email } });
      if (!teacher) {
        throw new Error("Teacher not found");
      }

      if (!teacher.email) {
        throw new Error("Teacher email is missing in the database");
      }
      
      if (args.googleId) {
        if (teacher.googleId !== args.googleId) {
          throw new Error("Invalid Google ID");
        }
      } else if (args.password) {
        if (!teacher.password) {
          throw new Error("This account does not support password login");
        }
        const isPasswordValid = await bcrypt.compare(args.password, teacher.password);
        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }
      } else {
        throw new Error("Either password or Google ID is required for login");
      }

      const token = jwt.sign({ teacherId: teacher.id, email: teacher.email }, SECRET_KEY, { expiresIn: "1h" });
      return { token, teacher };
    },
  },
};
