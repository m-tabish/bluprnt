import axios from "axios";
import { useEffect, useState } from "react";

export const usePollProjectStatus = (serverURL, projectId, onComplete) => {
    const [isPolling, setIsPolling] = useState(false);
    const [pollError, setPollError] = useState(null);

    useEffect(() => {
        if (!projectId) return;

        setIsPolling(true);
        setPollError(null);
        console.log("Polling")
        const interval = setInterval(async () => {
            try {
                const { data } = await axios.get(`${serverURL}/projects/${projectId}`);
                const status = data[0]?.status || data.status;
                const error = data[0]?.error || data.error;

                if (status === "COMPLETED") {
                    setIsPolling(false);
                    setPollError(null);
                    clearInterval(interval);
                    if (onComplete) onComplete(); // Trigger refresh in Dashboard
                } else if (status === "FAILED") {
                    setIsPolling(false);
                    setPollError(error || "Project processing failed");
                    clearInterval(interval);
                    if (onComplete) onComplete(); // Still refresh to show the failed project
                }
            } catch (err) {
                console.error("Polling error:", err);
            }
        }, 3000); // Poll every 3 seconds

        return () => clearInterval(interval);
    }, [projectId, serverURL]);

    return { isPolling, pollError };
};