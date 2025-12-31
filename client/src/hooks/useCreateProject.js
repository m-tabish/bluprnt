import { createProject } from "@/lib/projectService";
import { useState } from "react";

// Recommended fix for useCreateProject.js
export const useCreateProject = (serverURL) => {
    // Initialize as boolean false
    const [loading, setLoading] = useState(false);
    // Initialize as empty string
    const [status, setStatus] = useState('');

    const submitProject = async (input) => {
        setLoading(true);
        setStatus('');
        try {
            await createProject(serverURL, {
                projectname: input.project, // Ensure these keys match your API expectation
                projectDescription: input.projectDescription,
                language: input.language
            })
            setStatus('success');
        } catch (error) {
            setStatus('failed');
            console.error(error);
        }
        finally {
            setLoading(false)
        }
    }
    return { submitProject, loading, status }
}