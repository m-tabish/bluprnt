import { createSubscriptionService, handleDodoWebHookService } from "../services/subscriptions.service.js";

export async function subscribeController(req, res) {
    const { productId } = req.body;
    const userId = req.user.id;
    const email = req.user.email;

    const result = await createSubscriptionService(userId, email, productId)

    return res.success("Checkout link generated", result, 200);
}

export async function webhookController(req, res) {
    await handleDodoWebHookService(req.body);
    return res.status(200).json({ received: true });
}