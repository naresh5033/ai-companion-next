import { PrismaClient } from "@prisma/client"

declare global { 
  var prisma: PrismaClient | undefined
}

// this will prevent any hot reloading from causing any problems with this prisma client
const prismadb = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb

export default prismadb;
