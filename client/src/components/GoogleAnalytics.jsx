// src/components/GoogleAnalytics.jsx

import { useEffect } from "react";
import ReactGA from "react-ga4";
import { useLocation } from "react-router-dom";

ReactGA.initialize("G-0F7353MB2P");
export function usePageTracking() {
    const location = useLocation();

    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: location.pathname });
    }, [location]);
}


