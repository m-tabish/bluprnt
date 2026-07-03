import { useEffect, useMemo, useState } from "react";

import { fetchProjectsService } from "@/services/projectService";

export const useProjects = (reloadTrigger) => {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Reset state when reloadTrigger changes (e.g. new project added)
        setPage(1);
    }, [reloadTrigger]);

    useEffect(() => {
        let isMounted = true;
        const loadProjects = async () => {
            // If we are on page > 1, respect hasMore. If page is 1 (initial/reload), always load.
            if (page > 1 && !hasMore) return;
            if (loading) return;

            setLoading(true);
            try {
                // Fetch the specific page
                const data = await fetchProjectsService(page, 6);
                if (!isMounted) return;

                setProjects(prev => {
                    // Prevent duplicates if StrictMode causes double fetches
                    if (page === 1) {
                        return data.projects;
                    }
                    const newProjects = data.projects.filter(
                        newProj => !prev.some(existingProj => existingProj.id === newProj.id)
                    );
                    return [...prev, ...newProjects];
                });

                setHasMore(page < data.totalPages);
                setError(null);
            }
            catch (err) {
                if (isMounted) setError(err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        loadProjects();
        return () => {
            isMounted = false;
        };
    }, [page, reloadTrigger]); // run effect when page or reloadTrigger changes


    const loadMore = () => {
        if (!loading && hasMore) {
            setPage(prev => prev + 1);
        }
    };

    const latestProjects = useMemo(() => [...projects].slice(0, 6), [projects]);

    return { projects, latestProjects, error, loadMore, hasMore, loading };
}
