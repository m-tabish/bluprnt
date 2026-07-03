import { createProjectService, deleteProjectService, getProjectByIdService, getProjectsService } from "../services/project.service.js";

async function createProjectController(req, res) {
    let project
    try {
        const projectData = {
            ...req.body,
            userId: req.user.id
        }
        project = await createProjectService(projectData);

        return res.success(
            "Project generation started",
            project, 200)


    } catch (error) {
        console.error("Error creating project:", error); // 👈 Add this line
        res.fail(error.message || "Failed to create project", error, 500)
    }
}

async function getProjectController(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;

    const userId = req.user.id;



    const result = await getProjectsService(page, limit, userId);

    return res.success(
        "Projects fetched successfully",
        result
    );
}

async function getProjectByIdController(req, res) {
    try {
        const id = req.params.id;
        const project = await getProjectByIdService(id);
        if (project) {

            // match user id with authenticated user id 
            if (project.userId !== req.user.id) {
                return res.fail({
                    message: "Forbidden",
                    error: "",
                    statusCode: 403
                })
            }
            return res.json([project]);
        } else {
            return res.status(404).send("Not found");
        }
    } catch (error) {
        return res.status(500).send({ msg: error.message || error });
    }
}

async function deleteProjectController(req, res) {
    try {
        const id = req.params.id;
        const deletedItem = await deleteProjectService(id);
        if (!deletedItem) {
            return res.status(404).json({ msg: "Item not found" });
        }
        return res.json({ message: 'Item deleted successfully', item: deletedItem });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message || error });
    }
}

export { createProjectController, deleteProjectController, getProjectByIdController, getProjectController };

