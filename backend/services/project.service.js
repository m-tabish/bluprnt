import getRabbitMQChannel from "../lib/connectRabbitMQ.js";
import {
    createProjectRepo,
    deleteProjectRepo,
    getProjectByIdRepo,
    getProjectsRepo,
    getPublicProjectsRepo,
    updateProjectRepo
} from "../repository/project.repository.js";

export async function createProjectService(data) {
    let project;
    let channel = await getRabbitMQChannel();
    try {
        if (!channel) {
            throw new Error("RabbitMQ channel not ready");
        }

        project = await createProjectRepo({
            ...data,
            status: "PENDING"
        });


        const taskData = {
            projectId: project.id,
            body: data
        };

        channel.sendToQueue(
            "roadmap_queue",
            Buffer.from(JSON.stringify(taskData)),
            {
                persistent: true
            }
        );


        return project;

    } catch (error) {

        if (project?.id) {
            await updateProjectRepo(project.id, {
                status: "FAILED"
            });
        }

        throw error;
    }
}


export async function updateProjectService(id, data) {
    return updateProjectRepo(id, data);
}

export async function getProjectsService(page = 1, limit = 6, userId) {
    const { projects: list, totalCount } = await getProjectsRepo(page, limit, userId);
    const totalPages = Math.ceil(totalCount / limit);
    return {
        projects: list,
        totalPages
    };
}


export async function getPublicProjectsService(page = 1, limit = 6) {
    const { projects: list, totalCount } = await getPublicProjectsRepo(page, limit);

    const totalPages = Math.ceil(totalCount / limit);

    return {
        projects: list,
        totalPages
    }
}
export async function getProjectByIdService(id) {
    return getProjectByIdRepo(id);
}

export async function deleteProjectService(id) {
    return deleteProjectRepo(id);
}
