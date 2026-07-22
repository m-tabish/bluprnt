import dotenv from "dotenv";
import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schemas.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const db_url = process.env.DATABASE_URL;
if (!db_url) throw new Error("DATABASE URL not found");

const client = postgres(db_url);

export const db = drizzle(client, { schema });
export default db;