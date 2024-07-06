import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  DB_PASSOWRD: z.string(),
  DB_USERNAME: z.string(),
  PORT: z.string().optional().default("3000"),
  STAGE: z.string(),
  JWT_SECRET: z.string(),
});
const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error("Invalid environment variables:", env.error.errors);
  process.exit(1);
}

export { env };
