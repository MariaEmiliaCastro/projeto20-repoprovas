import { prisma } from "../src/config/database";
import { createTest } from "../src/types/testTypes";

async function main() {


    await prisma.$executeRaw`TRUNCATE TABLE "Tests"`;
    await prisma.$executeRaw`TRUNCATE TABLE "User"`;
}

main().catch(e => {
    throw e;
}).finally(async () => {
    await prisma.$disconnect();
});