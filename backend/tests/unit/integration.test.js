import { jest } from "@jest/globals";
import request from "supertest";

jest.unstable_mockModule("../../middleware/auth.middleware.js", () => ({
    requireAuth: (req, res, next) => {
        req.user = { id: "test-user-123", email: "test@example.com" };
        next();
    }
}));

jest.unstable_mockModule("../../services/project.service.js", () => ({
    getProjectsService: async () => ({ projects: [], totalCount: 0 }),
    createProjectService: async () => ({}),
    deleteProjectService: async () => ({}),
    getProjectByIdService: async () => ({}),
    getPublicProjectsService: async () => ({ projects: [], totalCount: 0 }),
    updateProjectService: async () => ({})
}));


const { default: app } = await import("../../server.js");

describe("Integration test : Express API endpoints", () => {
    it("Should return all projects", async () => {
        const response = await request(app).get("/projects");
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        console.log(response.body)
    });
});