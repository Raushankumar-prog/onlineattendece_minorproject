import prisma from "../../../server.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key"; // Replace with an actual secret key

export const studentResolvers = {
  Query: {
    students: async (_: any, args: { semester?: string; branch?: string }) => 
      await prisma.student.findMany({
        where: {
          semester: args.semester ?? undefined,
          branch: args.branch ?? undefined,
        },
      }),

    student: async (_: any, { id }: { id: string }) =>
      await prisma.student.findUnique({ where: { id } }),
  },
  
  Mutation: {
    createStudent: async (_: any, args: { email: string; name: string; scholarnumber: string; password?: string; googleId?: string ;semester?:string;branch?:string }) => {
      const existingStudent = await prisma.student.findUnique({ where: { email: args.email } });
      if (existingStudent) {
        throw new Error("Student already exists with this email");
      }
      
      let hashedPassword = args.password ? await bcrypt.hash(args.password, 10) : null;
      
      return prisma.student.create({
        data: {
          email: args.email,
          name: args.name ?? null,
          semester:args.semester ?? null,
          branch:args.branch??null,
          scholarnumber: args.scholarnumber,
          password: hashedPassword ?? null,
          googleId: args.googleId ?? null,
        },
      });
    },

    loginStudent: async (_: any, args: { email: string; password?: string; googleId?: string }) => {
      const student = await prisma.student.findUnique({ where: { email: args.email } });
      if (!student) {
        throw new Error("Student not found");
      }

      if (!student.email) {
        throw new Error("Student email is missing in the database");
      }
      
      if (args.googleId) {
        if (student.googleId !== args.googleId) {
          throw new Error("Invalid Google ID");
        }
      } else if (args.password) {
        if (!student.password) {
          throw new Error("This account does not support password login");
        }
        const isPasswordValid = await bcrypt.compare(args.password, student.password);
        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }
      } else {
        throw new Error("Either password or Google ID is required for login");
      }

      const token = jwt.sign({ studentId: student.id, email: student.email }, SECRET_KEY, { expiresIn: "1h" });
      return { token, student };
    },
  },
};