import supertest from "supertest";
import app from "../src/index";
import { prisma } from "../src/config/database";

const request = supertest(app);

const testData = {
  name: "Teste",
  pdfUrl: "https://play.hbomax.com/player/urn:hbo:episode:GXdcnNQvcGaXCPQEAADTr",
  category: "Projeto",
  discipline: "HTML e CSS",
  teacher: "Diego Pinho"
}

describe("Test POST /save-test route", () => {

  it("should return 401 in case the user is not authenticated", async () => {

    const response = await request.post("/save-test").set({Authorization: "Bla"}).send(testData);
    console.log(response.body);
    expect(response.status).toBe(401);
  });

  it("should return 200 OK", async () => {
    const userData = {
      email: "testando@gmail.com",
      password: "12345678"
    };

    await request.post("/sign-up").send(userData);
    const responseLogin = await request.post("/login").send(userData);
    const response = await request.post("/save-test").set({Authorization: responseLogin.body.token}).send(testData);
    console.log(response.body);
    expect(response.status).toBe(200);
  });
});

afterAll(async () => {
  // do something after all tests
  await prisma.$disconnect();
});