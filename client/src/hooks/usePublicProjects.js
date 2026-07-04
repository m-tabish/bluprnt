import { useEffect, useState } from "react";

import { fetchPublicProjectsService } from "@/services/projectService";

export const usePublicProjects = () => {
    const [projects, setProjects] = useState([])
    const [error, setError] = useState(null)
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        let isMounted = true;
        const loadProjects = async () => {
            if (page > 1 && !hasMore) return;

            if (loading) return;

            setLoading(false)
            try {
                const data = await fetchPublicProjectsService(page, 6);
                if (!isMounted) return;

                setProjects(prev => {
                    if (page == 1) return data.projects;
                    const newProjects = data.projects.filter(
                        newProj => !prev.some(existingProj => existingProj.id === newProj.id)
                    );
                    return [...prev, ...newProjects];
                });

                setHasMore(page < data.totalPages);
                setError(null);

            } catch (error) {
                if (isMounted) setError(error);

            }
            finally {
                if (isMounted) setLoading(false);
            }
        };
        loadProjects();
        return () => { isMounted = false; };
    }, [page])

    const loadMore = () => {
        if (!loading && hasMore) {
            setPage(prev => prev + 1);
        }
    }

    return { projects, error, loadMore, hasMore, loading };


}