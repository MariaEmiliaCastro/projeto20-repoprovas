import supertest from "supertest";
import app from "../src/index";

const request = supertest(app);

describe("Tests Route POST /all-tests-teacher", () => {

    it("should return 401 in case the user is not authenticated", async () => {

        const response = await request.get("/all-tests-teacher").set({Authorization: "Bla"});
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
        const response = await request.get("/all-tests-teacher").set({Authorization: responseLogin.body.token});
        expect(response.status).toBe(200);
    });
});