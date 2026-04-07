import { useEffect, useState } from "react";

export const useGetProject = (serverURL) => {
    // FIX 1: useState returns [value, setter function]. You had 4 variables in one.
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        // Use an AbortController to prevent memory leaks if component unmounts
        const controller = new AbortController();

        const fetchProjects = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${serverURL}/projects`, { signal: controller.signal });

                if (!response.ok) {
                    throw new Error(`Server error: ${response.status}`);
                }

                const data = await response.json();

             
                setProjects(data.projects);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();

        return () => controller.abort(); // Cleanup
    }, [serverURL]);

    return { projects, loading, error };
};