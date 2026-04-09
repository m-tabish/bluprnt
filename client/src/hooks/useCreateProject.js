import { createProject } from "@/services/projectService";
import { useState } from "react";


export const useCreateProject = (serverURL, projectId) => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState([]);
    const [createdProjectId, setCreatedProjectId] = useState(null);

    const submitProject = async (input) => {
        setLoading(true);
        setStatus('');
        setCreatedProjectId(null);

        try {
            const response = await createProject(serverURL, {
                projectname: input.project,
                projectDescription: input.projectDescription,
                language: input.language
            })
            setStatus('success');
            // Extract project ID from response
            const projectId = response?.projectId || response?._id || response?.id;
            setCreatedProjectId(projectId);
            return projectId;

        } catch (error) {
            setStatus('failed');
            return null;
        }
        finally {
            setLoading(false)
        }
    }
    return { submitProject, loading, status, createdProjectId }

}