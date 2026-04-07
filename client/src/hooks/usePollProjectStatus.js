import axios from "axios";
import { useEffect, useState } from "react";

export const usePollProjectStatus = (serverURL, projectId, onComplete) => {
    const [isPolling, setIsPolling] = useState(false);

    useEffect(() => {
        if (!projectId) return;

        setIsPolling(true);
        console.log("Polling")
        const interval = setInterval(async () => {
            try {
                const { data } = await axios.get(`${serverURL}/projects/${projectId}`);

                if (data[0]?.status === "COMPLETED" || data.status === "COMPLETED") {
                    setIsPolling(false);
                    clearInterval(interval);
                    if (onComplete) onComplete(); // Trigger refresh in Dashboard
                }
            } catch (err) {
                console.error("Polling error:", err);
            }
        }, 3000); // Poll every 3 seconds

        return () => clearInterval(interval);
    }, [projectId, serverURL]);

    return { isPolling };
};