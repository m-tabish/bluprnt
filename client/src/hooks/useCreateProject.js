import { createProject } from "@/services/projectService";
import { useState } from "react";


export const useCreateProject = (serverURL, projectId) => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState([]);

    const submitProject = async (input) => {
        setLoading(true);
        setStatus('');


        try {
            await createProject(serverURL, {
                projectname: input.project,
                projectDescription: input.projectDescription,
                language: input.language
            })
            setStatus('success');

        } catch (error) {
            setStatus('failed');
        }
        finally {
            setLoading(false)
        }
    }
    return { submitProject, loading, status }

}