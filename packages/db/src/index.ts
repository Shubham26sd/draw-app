import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg";
//@ts-ignore
import { PrismaClient } from "./generated/prisma/client.ts"
import "dotenv/config"

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({ connectionString });

const prismaSingleton = () => {
    return new PrismaClient({ adapter })
}

declare global {
    var prisma: undefined | ReturnType<typeof prismaSingleton>
}

const prismaClient = globalThis.prisma ?? prismaSingleton()

if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = prismaClient
}

export { prismaClient };