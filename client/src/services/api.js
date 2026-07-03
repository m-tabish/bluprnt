import axios from "axios";
import { supabase } from "../supabase/supabase.js";

const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
});

api.interceptors.request.use(
    async (config) => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.access_token) {
            config.headers.Authorization = `Bearer ${session.access_token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
