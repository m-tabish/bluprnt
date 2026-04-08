import { useEffect, useState } from "react";
export const useGithubStars = (serverURL) => {
    const [stars, setStars] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!serverURL) return;
        const getStars = async () => {
            try {
                const response = await fetch(`${serverURL}/github-stars`)


                const result = await response.json();
                setStars(result.stars);
            } catch (error) {
                setError(error);
            }
        }
        getStars();
    }, [serverURL])


    return { stars, error };
}
