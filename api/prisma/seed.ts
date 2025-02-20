import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log("🧹 Clearing existing data...");
  await prisma.attendance.deleteMany();
  await prisma.studentSubject.deleteMany();
  await prisma.teacherSubject.deleteMany();
  await prisma.student.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.subject.deleteMany();

  console.log("🌱 Seeding database...");

  // Create 4 Teachers
  const teachers = await Promise.all(
    Array.from({ length: 4 }).map(async () => {
      const password = await bcrypt.hash("password123", 10);
      return prisma.teacher.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email().toLowerCase(),
          googleId: faker.string.uuid(),
          password: password, // Using the hashed password
        },
      });
    })
  );

  // Create 6 Subjects
  const subjectNames = ['Mathematics', 'Science', 'English', 'History', 'Physics', 'Computer Science'];
  const subjects = await Promise.all(
    subjectNames.map(async (name) => prisma.subject.create({ data: { name } }))
  );

  // Assign Subjects to Teachers (each subject is taught by 1-2 teachers)
  for (const subject of subjects) {
    const assignedTeachers = faker.helpers.arrayElements(teachers, faker.number.int({ min: 1, max: 2 }));
    for (const teacher of assignedTeachers) {
      await prisma.teacherSubject.create({
        data: {
          teacherId: teacher.id,
          subjectId: subject.id,
        },
      });
    }
  }

  // List of branches
  const branches = ['Computer Science', 'Mechanical', 'Electrical', 'Civil', 'Electronics'];

  // Create 30 Students with semester and branch
  const students = await Promise.all(
    Array.from({ length: 10 }).map(async (_, i) => {
      const password = await bcrypt.hash("password123", 10);
      return prisma.student.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email().toLowerCase(),
          scholarnumber: `SCHL${1000 + i}`, // Corrected template literal
          semester: faker.number.int({ min: 1, max: 8 }).toString(), // Random semester 1-8
          branch: faker.helpers.arrayElement(branches), // Random branch
          googleId: faker.string.uuid(),
          password: password, // Using hashed password
        },
      });
    })
  );

  // Assign Students to Subjects (each student takes 3-5 subjects)
  for (const student of students) {
    const enrolledSubjects = faker.helpers.arrayElements(subjects, faker.number.int({ min: 3, max: 5 }));
    for (const subject of enrolledSubjects) {
      await prisma.studentSubject.create({
        data: {
          studentId: student.id,
          subjectId: subject.id,
        },
      });
    }
  }

  // Generate Attendance Records (random attendance for the past 10 days)
  for (const student of students) {
    const enrolledSubjects = await prisma.studentSubject.findMany({
      where: { studentId: student.id },
      include: { subject: true },
    });

    for (const subjectRelation of enrolledSubjects) {
      const teachersForSubject = await prisma.teacherSubject.findMany({
        where: { subjectId: subjectRelation.subjectId },
        include: { teacher: true },
      });

      if (teachersForSubject.length > 0) {
        const randomTeacher = faker.helpers.arrayElement(teachersForSubject).teacher;

        for (let daysAgo = 1; daysAgo <= 10; daysAgo++) {
          await prisma.attendance.create({
            data: {
              studentId: student.id,
              subjectId: subjectRelation.subjectId,
              teacherId: randomTeacher.id,
              date: faker.date.recent(10), // Fixed incorrect syntax
              status: faker.helpers.arrayElement(['PRESENT', 'ABSENT', 'LATE']),
            },
          });
        }
      }
    }
  }

  console.log("✅ Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
