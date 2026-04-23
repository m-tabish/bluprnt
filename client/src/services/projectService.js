import axios from "axios";
export const fetchProjects = async (serverURL, page = 1, limit = 6) => {
    const response = await axios.get(`${serverURL}/projects`, {
        params: { page, limit }
    });
    return response.data;
}

export const createProject = async (serverURL, payload) => {
    const response = await axios.post(
        `${serverURL}/create-project`, payload
    )
    return response.data;
}