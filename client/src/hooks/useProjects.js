import { useEffect, useMemo, useState } from "react";

import { fetchProjects } from "@/services/projectService";

export const useProjects = (serverURL, reloadTrigger) => {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Reset state when serverURL or reloadTrigger changes (e.g. new project added)
        setProjects([]);
        setPage(1);
        setHasMore(true);
        setError(null);
    }, [serverURL, reloadTrigger]);

    useEffect(() => {
        const loadProjects = async () => {
            if (!hasMore || loading) return;
            setLoading(true);
            try {
                // Fetch the specific page
                const data = await fetchProjects(serverURL, page, 6);
                
                setProjects(prev => {
                    // Prevent duplicates if StrictMode causes double fetches
                    const newProjects = data.projects.filter(
                        newProj => !prev.some(existingProj => existingProj._id === newProj._id)
                    );
                    return [...prev, ...newProjects];
                });
                
                setHasMore(page < data.totalPages);
            }
            catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (serverURL) {
            loadProjects();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [serverURL, page, reloadTrigger]); // run effect when page changes

    const loadMore = () => {
        if (!loading && hasMore) {
            setPage(prev => prev + 1);
        }
    };

    const latestProjects = useMemo(() => [...projects].slice(0, 6), [projects]);

    return { projects, latestProjects, error, loadMore, hasMore, loading };
}
