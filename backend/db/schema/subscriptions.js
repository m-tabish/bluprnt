import {
    boolean,
    integer,
    pgEnum,
    pgTable,
    text,
    timestamp,
    uuid
} from "drizzle-orm/pg-core";


const subscriptsStatusEnum = pgEnum('subscription_status', [
    'PENDING',
    'ACTIVE',
    'PAST_DUE',
    'CANCELLED',
    'EXPIRED',
])

// Subscriptions
export const subscriptions = pgTable('payments', {
    id: uuid('id').notNull().primaryKey(),
    userId: uuid("user_id").notNull().references(() => users.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),

    // Dodo Payment IDs
    dodoSubscriptionId: text("dodo_subscription_id").unique().notNull(),
    dodoCustomerId: text("dodo_customer_id"),
    productId: text("product_id").notNull(),

    // Financials 
    amount: integer("amount").notNull(),
    currency: text('currency').default("INR").notNull(),

    // Saas Subscription state
    status: subscriptsStatusEnum().default("PENDING").notNull(),
    cancelAtPeriodEnd: boolean('cancel_at_period_end').default(false).notNull(),
    currentPeriodStart: timestamp("current_period_start").notNull(),
    currentPeriodEnd: timestamp("current_period_end").notNull(),   // User retains access until this date

    updatedAt: timestamp("updated_at").defaultNow().notNull()


})