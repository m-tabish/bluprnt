import { and, count, desc, eq } from "drizzle-orm";
import { db } from "../db/dbInitialise.js";
import { projects } from "../db/schema/projects.js";
import { users } from "../db/schema/users.js";

// Get projects
export async function getProjectsRepo(page = 1, limit = 6, userId) {
    const offset = (page - 1) * limit;


    let baseQuery = db.select().from(projects);
    let baseCountQuery = db.select({ count: count() }).from(projects)

    if (userId) {
        baseQuery = baseQuery.where(and(eq(projects.userId, userId), eq(projects.status, "COMPLETED")));
        baseCountQuery = baseCountQuery.where(and(eq(projects.userId, userId), eq(projects.status, "COMPLETED")));
    } else {
        baseQuery = baseQuery.where(eq(projects.status, "COMPLETED"));
        baseCountQuery = baseCountQuery.where(eq(projects.status, "COMPLETED"));
    }

    const data = await baseQuery
        .orderBy(desc(projects.createdAt))
        .limit(limit)
        .offset(offset);

    const [countResult] = await baseCountQuery

    return {
        projects: data,
        totalCount: Number(countResult.count)
    };
}


export async function getPublicProjectsRepo(page = 1, limit = 6, userId) {
    const offset = (page - 1) * limit;

    const data = await db.select({
        id: projects.id,
        projectName: projects.projectName,
        projectDescription: projects.projectDescription,
        tags: projects.tags,
        createdAt: projects.createdAt,
        status: projects.status,
        creatorName: users.username
    })
        .from(projects)
        .leftJoin(users, eq(projects.userId, users.id))
        .where(
            and(
                eq(projects.isPublic, true),
                eq(projects.status, "COMPLETED")
            )
        )
        .orderBy(desc(projects.createdAt))
        .limit(limit)
        .offset(offset)


    // Get total count of public completed projects
    const [countResult] = await db.select({ count: count() })
        .from(projects)
        .where(
            and(
                eq(projects.isPublic, true),
                eq(projects.status, "COMPLETED")
            )
        )

    return {
        projects: data,
        totalCount: Number(countResult.count)
    }

}

// Create project
export async function createProjectRepo(data) {
    if (data.userId) {
        const [existingUser] = await db
            .select()
            .from(users)
            .where(eq(users.id, data.userId))
            .limit(1);

        if (!existingUser) {
            throw new Error("User does not exist");
        }
    }

    const [project] = await db
        .insert(projects)
        .values(data)
        .returning();

    return project;
}


// Update project
export async function updateProjectRepo(id, data) {
    const [project] = await db
        .update(projects)
        .set(data)
        .where(eq(projects.id, id))
        .returning();

    return project;
}

// Get project by ID
export async function getProjectByIdRepo(id) {
    const [project] = await db
        .select()
        .from(projects)
        .where(eq(projects.id, id))
        .limit(1);

    return project;
}

// Delete project
export async function deleteProjectRepo(id) {
    const [project] = await db
        .delete(projects)
        .where(eq(projects.id, id))
        .returning();

    return project;
}

