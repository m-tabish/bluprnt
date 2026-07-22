import { Router } from "express";
import { createProjectController, deleteProjectController, getProjectByIdController, getProjectController, getPublicProjectsController } from "../controllers/project.controller.js";
import { asyncHandler } from "../lib/asyncHandler.js";
import { requireAuth } from "../middleware/auth.middleware.js";


const projectRouter = Router();


// Public routes (no authentication required)
projectRouter.get("/public", asyncHandler(getPublicProjectsController));

// Protected routes (require authentication)
projectRouter.use(requireAuth);
projectRouter.get("", asyncHandler(getProjectController));


projectRouter.get("/:id", asyncHandler(getProjectByIdController));
projectRouter.post("/create-project", asyncHandler(createProjectController));
projectRouter.delete("/delete/:id", asyncHandler(deleteProjectController));

export default projectRouter;