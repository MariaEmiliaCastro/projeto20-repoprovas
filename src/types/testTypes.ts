import { Tests } from "@prisma/client";

export type createTest = Omit<Tests, "id">;

export type testObject = {
    name: string,
    pdfUrl: string,
    category: string,
    discipline: string,
    teacher: string 
}