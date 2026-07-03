import { createProjectService } from "@/services/projectService";
import { useAuth } from "@/supabase/authContext";
import { useState } from "react";

// Creates first entry in the db and updates after generating response from LLM .
export const useCreateProject = () => {
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [createdProjectId, setCreatedProjectId] = useState(null);

    const submitProject = async (payload) => {
        setLoading(true);
        setStatus('');
        setCreatedProjectId(null);

        try {

            const userId = currentUser?.id || ""

            // Create project entry in the db with status: PENDING
            const response = await createProjectService({
                userId: userId,
                projectName: payload.project,
                projectDescription: payload.projectDescription,
                tags: [payload.language || "General"],
                isPublic: false,
                steps: null
            })

            // Extract project ID from response 

            const newProjectId = response?.id;


            if (!newProjectId) {
                console.error("No projectId returned in response");
                setCreatedProjectId(null);
                setStatus('FAILED');
                return null;
            }
            setCreatedProjectId(newProjectId);
            setStatus('SUCCESS');
            return newProjectId;

        } catch (error) {
            console.error("Create project error:", error);
            setStatus('FAILED');
            return null;
        }
        finally {
            setLoading(false)
        }
    }
    return { submitProject, loading, status, createdProjectId }

}