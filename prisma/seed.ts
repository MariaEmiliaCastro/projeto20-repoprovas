import { prisma } from "../src/config/database";
import { createTest } from "../src/types/testTypes";

async function main() {


    await prisma.$executeRaw`TRUNCATE TABLE "Tests"`;
    await prisma.$executeRaw`TRUNCATE TABLE "User"`;
//    await prisma.$executeRaw`TRUNCATE TABLE "Category"`;

    const user = {
        email: "teste@email.com",
        password: "12345678"
    }

    const newUser = await prisma.user.upsert({
        where: {
            email: user.email
        },
        update: {},
        create: user
    });

    const testData: createTest = {
        name: "Teste",
        pdfUrl: "https://play.hbomax.com/player/urn:hbo:episode:GXdcnNQvcGaXCPQEAADTr",
        categoryId: 1,
        teachersDisciplinesId: 1
    }

    await prisma.tests.create({
        data: testData
    });
}

main().catch(e => {
    throw e;
}).finally(async () => {
    await prisma.$disconnect();
});