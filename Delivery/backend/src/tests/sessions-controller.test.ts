import { app } from "@/app";
import { prisma } from "@/database/prisma";
import request from "supertest";

describe("SessionsController", () => {
  let user_id: string;

  //after all tests 'user' will be removed
  afterAll(async () => {
    await prisma.user.delete({ where: { id: user_id } });
  });

  it("should authenticated and get access token", async () => {
    const userResponse = await request(app).post("/users").send({
      name: "Auth Test User",
      email: "auth_test_user@example.com",
      password: "password123",
    });

    user_id = userResponse.body.id;

    const sessionResponse = await request(app).post("/sessions").send({
      email: "auth_test_user@example.com",
      password: "password123",
    });

    expect(sessionResponse.status).toBe(200);
    //verify if token exist and is a string
    expect(sessionResponse.body.token).toEqual(expect.any(String));
  });
});
