import { useEffect, useMemo, useState } from "react";

import { fetchProjects } from "@/services/projectService";

export const useProjects = (serverURL, reloadTrigger) => {
    const [projects, setProjects] = useState([])
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await fetchProjects(serverURL);

                setProjects(data);
            }
            catch (err) {
                setError(err)
            }
        }


        if (serverURL) loadProjects();

    }, [serverURL, reloadTrigger])


    const latestProjects = useMemo(() => [...projects].reverse().slice(0, 6), [projects])

    return { projects, latestProjects, error };
}
