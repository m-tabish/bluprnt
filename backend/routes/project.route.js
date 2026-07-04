import { Router } from "express";
import { createProjectController, deleteProjectController, getProjectByIdController, getProjectController, getPublicProjectsController } from "../controllers/project.controller.js";
import { asyncHandler } from "../lib/asyncHandler.js";
import { requireAuth } from "../middleware/auth.middleware.js"; // Import middleware


const projectRouter = Router();


projectRouter.use(requireAuth);
projectRouter.get("", asyncHandler(getProjectController));


projectRouter.get("/public", asyncHandler(getPublicProjectsController));


projectRouter.get("/:id", asyncHandler(getProjectByIdController));
projectRouter.post("/create-project", asyncHandler(createProjectController));
projectRouter.delete("/delete/:id", asyncHandler(deleteProjectController));

export default projectRouter;