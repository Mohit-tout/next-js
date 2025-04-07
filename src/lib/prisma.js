// lib/prisma.js
import { PrismaClient } from "@prisma/client";

let prisma;

if (typeof global.prisma !== 'undefined') {
  prisma = global.prisma;
} else {
  prisma = new PrismaClient();
  if (process.env.NODE_ENV !== "production") {
    global.prisma = prisma;
  }
}

export { prisma };
