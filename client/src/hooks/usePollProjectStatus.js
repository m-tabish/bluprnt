import { useEffect, useState } from "react";
import api from "../services/api.js";

export const usePollProjectStatus = (projectId, onComplete) => {
    const [isPolling, setIsPolling] = useState(false);
    const [pollError, setPollError] = useState(null);

    useEffect(() => {
        if (!projectId) {

            setIsPolling(false);
            return;
        }


        setIsPolling(true);
        setPollError(null);

        let isMounted = true;
        const interval = setInterval(async () => {
            if (!isMounted) return;

            try {
                const { data } = await api.get(`/projects/${projectId}`);
                if (!isMounted) return;

                const status = data[0]?.status || data.status;
                const error = data[0]?.error || data.error;

                if (status === "COMPLETED") {
                    setIsPolling(false);
                    setPollError(null);
                    clearInterval(interval);
                    if (onComplete) onComplete();
                } else if (status === "FAILED") {
                    setIsPolling(false);
                    setPollError(error || "Project processing failed");
                    clearInterval(interval);
                    if (onComplete) onComplete();
                }
            } catch (err) {
                console.error("Polling error:", err);
            }
        }, 3000);

        return () => {
            isMounted = false;
            clearInterval(interval);
        };

    }, [projectId]);

    return { isPolling, pollError };
};