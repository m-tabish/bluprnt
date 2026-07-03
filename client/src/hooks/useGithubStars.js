import { useEffect, useState } from "react";
import api from "../services/api.js";

export const useGithubStars = () => {
    const [stars, setStars] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {

        const getStars = async () => {
            try {
                const response = await api.get(`/github-stars`)
                setStars(response.data.stars);
            } catch (error) {
                setError(error);
            }
        }
        getStars();
    }, [])


    return { stars, error };
}
