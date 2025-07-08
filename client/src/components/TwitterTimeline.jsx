/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

function TwitterTimeline({ screenName = 'damnthesebugs', height = 500 }) {
    const containerRef = useRef();

    useEffect(() => {
        // Once widgets.js is guaranteed loaded, transform the <a> into a timeline:
        if (window.twttr && window.twttr.widgets) {
            window.twttr.widgets.load(containerRef.current);
        }
    }, [screenName]);

    return (
        <div
            ref={containerRef}
            className="w-full max-w-lg mx-auto"
            style={{ height: `${height}px` }}
        >
            {/* 
        This anchor must be here on first render — 
        widgets.js will find & convert it into an embedded timeline.
      */}
            <a
                className="twitter-timeline"
                data-theme="light"
                data-chrome="noheader nofooter noborders"
                href={`https://twitter.com/${screenName}`}
                // Optional: give it a block-level placeholder
                style={{ display: 'block', height: '100%' }}
            >
                Tweets by @{screenName}
            </a>
        </div>
    );
}

export default TwitterTimeline