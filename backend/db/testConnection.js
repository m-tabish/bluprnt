import db from "./dbInitialise.js";
import { roadmaps } from "./schema.js";

async function main() {
    const data = await db.select().from(roadmaps);
    console.log(data);
}


main().catch(console.error);