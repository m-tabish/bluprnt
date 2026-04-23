import axios from "axios";
import { useEffect, useState } from "react";

const isValidObjectId = (value) => /^[a-f\d]{24}$/i.test(value);
export const usePollProjectStatus = (serverURL, projectId, onComplete) => {
    const [isPolling, setIsPolling] = useState(false);
    const [pollError, setPollError] = useState(null);

    useEffect(() => {
        if (!projectId) {
            
            setIsPolling(false);
            return;
        }

        if (!isValidObjectId(projectId)) {
            console.error("Invalid projectId for polling:", projectId);
            setIsPolling(false);
            setPollError("Invalid project id");
            return;
        }

        
        setIsPolling(true);
        setPollError(null);

        let isMounted = true;
        const interval = setInterval(async () => {
            if (!isMounted) return;

            try {
                const { data } = await axios.get(`${serverURL}/projects/${projectId}`);
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
        // Only depend on projectId - serverURL is app config, onComplete is from useCallback
    }, [projectId]);

    return { isPolling, pollError };
};