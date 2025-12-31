import axios from "axios";

export const fetchProjects = async (serverURL) => {
    const response = await axios.get(`${serverURL}/projects`);
    return response.data;
}

export const createProject = async (serverURL, payload) => {
    const response = axios.post(
        `${serverURL}/create-project`, payload
    )
    return (await response).data;

}