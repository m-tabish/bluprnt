/* eslint-disable react/prop-types */
export const SVGBrushStroke = ({ children }) => (
    <div className="relative inline-block">
        <svg className="absolute inset-0 w-full h-full -z-10" viewBox="0 0 200 50">
            <path
                d="M10,25 Q50,15 100,20 T190,25"
                stroke="#ff6b6b"
                strokeWidth="25"
                strokeLinecap="round"
                fill="none"
                opacity="0.8"
            />
        </svg>
        <span className="relative z-10 text-white font-bold px-4">
            {children}
        </span>
    </div>
);