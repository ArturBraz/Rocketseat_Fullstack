import  request  from "supertest"
import { app } from "./app"

describe("products",()=>{
  it("should list products", async()=>{
    const response = await request(app).get("/products")
    //console.log(response.body)

    expect(response.statusCode).toBe(200)
    expect(response.body.length).toBeGreaterThan(0)
  })
})