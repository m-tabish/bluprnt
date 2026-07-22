import { eq } from "drizzle-orm";
import { db } from "../db/dbInitialise.js";
import { subscriptions } from "../db/schema/subscriptions.js";


export async function upsertSubscriptionRepo(data) {
    const [result] = await db
        .insert(subscriptions)
        .values(data)
        .onConflictDoUpdate({
            target: subscriptions.dodoSubscriptionId,
            set: {
                status: data.status,
                cancelAtPeriodEnd: data.cancelAtPeriodEnd,
                currentPeriodStart: data.currentPeriodStart,
                cancelAtPeriodEnd: data.cancelAtPeriodEnd,
                updatedAt: new Date()
            }
        })
        .returning();

    return result;
}


export async function getSubscriptionByUserIdRepo(userId) {
    const [subscription] = await db
        .select()
        .from(subscriptions)
        .where(eq(subscriptions.userId, userId));
    return subscription;
}