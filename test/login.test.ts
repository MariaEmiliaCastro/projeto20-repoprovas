import supertest from "supertest";
import app from "../src/index";
import { prisma } from "../src/config/database";
import dotenv from "dotenv";

dotenv.config();
const request = supertest(app);

const userData = {
  email : "maria@email.com",
  password : "12345678"
}

beforeEach(async () => {
  // do something before each test
  await prisma.$executeRaw`TRUNCATE TABLE "User"`;
});

describe("Tests Route POST /login", () => {
  it("should return 401 in case the user does not exist", async () => {
    const userData = {
        email : "miley.cyrus@email.com",
        password : "HannahMontana"
    }
    const response = await request.post("/login").send(userData);
    expect(response.status).toBe(401);
  });

  it("should return 200 in case the user exists", async () => {
    const data = await request.post("/sign-up").send(userData);
    const response = await request.post("/login").send(userData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});

afterAll(async () => {
  // do something after all tests
  await prisma.$disconnect();
});