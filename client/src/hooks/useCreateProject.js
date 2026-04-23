import { createProject } from "@/services/projectService";
import { useState } from "react";

const isValidObjectId = (value) => /^[a-f\d]{24}$/i.test(value);

export const useCreateProject = (serverURL, projectId) => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
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
           
            // Extract project ID from response
            const projectId = response?.projectId || response?._id || response?.id;
          
            if (!isValidObjectId(projectId)) {
                console.error("Invalid projectId returned:", projectId);
                setCreatedProjectId(null);
                setStatus('failed');
                return null;
            }
            setCreatedProjectId(projectId);
            setStatus('success');
            return projectId;

        } catch (error) {
            console.error("Create project error:", error);
            setStatus('failed');
            return null;
        }
        finally {
            setLoading(false)
        }
    }
    return { submitProject, loading, status, createdProjectId }

}