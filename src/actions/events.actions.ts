"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createUser() {
  try {
    // Create a new user along with an event and a comment
    const newUser = await prisma.user.create({
      data: {
        email: "user@example.com",
        name: "John Doe",
        password: "securepassword",
      },
    });

    console.log("Created user with event and comment:", newUser);
  } catch (error) {
    console.error("Error creating user with event and comment:", error);
  } finally {
    // Disconnect Prisma Client
    await prisma.$disconnect();
  }
}

export const createComment = async () => {
  await prisma.comment.create({
    data: {
      comment: "comment",
    },
  });
};

export async function createEvent(imgSrc: string) {
  try {
    await prisma.$transaction(async (tx) => {
      await tx.event.create({
        data: {
          date: new Date(),
          duration: 2.5, // Example duration
          isPast: false, // Example value
          name: "Coffee & Code",
          user: {
            connect: { email: "user@example.com" }, // Associate the event with the user
          },
          photo: {
            create: {
              imgSrc: imgSrc,
            },
          },
        },
      });
    });
  } catch (error) {
    throw new Error();
  } finally {
    await prisma.$disconnect();
  }
}
