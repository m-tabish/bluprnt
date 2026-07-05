import db from "./dbInitialise.js";
import { projects } from "./schema.js";

async function main() {
    const data = await db.select().from(projects).limit(1);
    console.log("Database connection successful! Sample project:", data);
}

main().catch(console.error);