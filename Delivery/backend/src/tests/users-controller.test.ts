import { app } from "@/app";
import { prisma } from "@/database/prisma";
import request from "supertest";

describe("UsersController", () => {
  let user_id: string;

  //after all tests 'user' will be removed 
  afterAll(async () => {
    await prisma.user.delete({ where: { id: user_id } });
  });

  it("should create a new user successfully", async () => {
    const response = await request(app).post("/users").send({
      name: "Test User",
      email: "testeuser@example.com",
      password: "password123",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Test User");

    user_id = response.body.id;
  });

  it("should throw an Error if user with same email already exist",async()=>{
    const response = await request(app).post("/users").send({
      name: "Duplicate User",
      email: "testeuser@example.com",
      password: "password123",
    });

    expect(response.status).toBe(400)
    expect(response.body.message).toBe("User with same email already exist.")
  })

  it("should throw a validation error if email is invalid",async()=>{
    const response =  await request(app).post("/users").send({
      name: "Test User",
      email: "invalid-email",
      password: "password123",
    })

    expect(response.status).toBe(400)
    expect(response.body.message).toBe("validation error")
  })

});
