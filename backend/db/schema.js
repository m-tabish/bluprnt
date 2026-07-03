
import {
    boolean,
    index,
    jsonb,
    pgEnum,
    pgTable,
    text,
    timestamp,
    uuid
} from "drizzle-orm/pg-core";

import { z } from "zod";


export const roadmapPayloadSchema = z.object({
    nodes: z.array(z.object({
        nodeId: z.string(),
        process: z.string(),
        description: z.string(),
        code: z.string(),
        resources: z.array(z.string()),
        target: z.array(z.string())
    })),
    edges: z.array(z.object({
        source: z.string(),
        target: z.string(),
        label: z.string()
    }))
});

export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    fullName: text('full_name').notNull(),
    email: text("email").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projectstatusEnum = pgEnum("project_status", [
    "PENDING",
    "COMPLETED",
    "FAILED"
]);


const projects = pgTable('projects', {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").notNull().references(() => users.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    projectName: text("project_name").notNull(),
    status: projectstatusEnum("status").notNull(),
    tags: text("tags").array().notNull(),
    projectDescription: text("project_description").notNull(),
    isPublic: boolean("is_public").default(false).notNull(),
    steps: jsonb("steps"),
},
    (table) => [index("projects_user_idx").on(table.userId),
    index("projects_public_idx").on(table.isPublic)
    ]
);

export { projects };
