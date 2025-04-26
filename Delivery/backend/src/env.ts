import { z } from "zod";

//validate environments of .env
const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string(),
});

//passes the environment variables to the rest of the application 
export const env = envSchema.parse(process.env); 
