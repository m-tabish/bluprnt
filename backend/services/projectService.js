const { Project } = require("../db/mongo")
const updateProject = async (projectId, project) => {
    try {
        return await Project.findByIdAndUpdate(projectId, {
            technologies: project.technologies,
            projectDescription: project.description,
            steps: project.steps,
            status: "COMPLETED",
            created_at: Date.now()
        }, { new: true });
        return updateProject;
    }
    catch (error) {
        // Log the error to the terminal instead of trying to send it to a browser
        console.error("❌ Database Update Error:", error.message);
        throw error; // Re-throw so the worker's catch block can handle it

    }
};

module.exports = { updateProject };