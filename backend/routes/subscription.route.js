import { Router } from "express";
import { subscribeController, webhookController } from "../controllers/subscription.controller.js";
import { asyncHandler } from "../lib/asyncHandler.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const subscriptionRouter = Router()

subscriptionRouter.post("/subscribe", requireAuth, asyncHandler(subscribeController));
subscriptionRouter.post('/webhook', asyncHandler(webhookController))

export default subscriptionRouter;