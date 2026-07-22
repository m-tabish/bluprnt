import { DodoPayments } from 'dodopayments';

import { upsertSubscriptionRepo } from "../repository/subscription.repository.js";

const dodo = new DodoPayments({
    apiKey: process.env.DODO_PAYMENTS_API_KEY?.trim(),
    environment: process.env.DODO_PAYMENTS_ENV?.trim() 
});

export async function createSubscriptionService(userId, email, productId) {
    const response = await dodo.checkoutSessions.create({
        product_cart: [
            {
                product_id: productId,
                quantity: 1
            }
        ],
        billing: { email },
        metadata: { userId },
        return_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/dashboard`
    });

    return {
        paymentUrl: response.checkout_url,
        sessionId: response.session_id
    };
}

export async function handleDodoWebHookService(eventData) {
    const { type, data } = eventData;

    if (type === "subscription.active" || type === "subscription.renewed") {
        await upsertSubscriptionRepo({
            userId: data.metadata.userId,
            dodoSubscriptionId: data.subscription_id,
            dodoCustomerId: data.customer.customer_id,
            productId: data.product_id,
            amount: data.recurring_price,
            currency: data.currency,
            status: "ACTIVE",
            currentPeriodStart: new Date(data.current_period_start),
            currentPeriodEnd: new Date(data.current_period_end)
        });
    }
}