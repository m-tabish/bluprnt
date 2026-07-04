import api from "./api.js";

export const fetchProjectsService = async (page = 1, limit = 6) => {
    const response = await api.get(`/projects`, {
        params: { page, limit }
    });
    return response.data.data;
};


export const fetchPublicProjectsService = async (page = 1, limit = 6) => {
    const response = await api.get(`/projects/public`, {
        params: { page, limit }
    });
    return response.data.data;
};

export const createProjectService = async (payload) => {
    const response = await api.post(`/projects/create-project`, payload);
    return response.data.data;
};

export const deleteProjectService = async (projectId) => {
    const response = await api.delete(`/projects/delete/${projectId}`);
    return response.data.data;
};