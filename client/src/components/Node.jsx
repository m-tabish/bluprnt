/* eslint-disable react/prop-types */
import { cn } from "@/lib/utils";

function Node({ className, bodyHead, bodyText, isActive, onClick }) {
    return (
        <div
            onClick={onClick}
            className={cn(
                `w-48 h-24 border rounded-lg flex items-center cursor-pointer transition-all duration-300`,
                isActive ? "shadow-[0_0_20px_#00ff00] scale-105" : "shadow-[0_0_20px_#ff0000]",
                className
            )}
        >
            <div className="w-1/4 border h-full flex flex-col items-center justify-around text-white bg-blue-800 rounded-tl-lg rounded-bl-lg">
                <p className="text-xl font-bold">1</p>
                <p>{"</>"}</p>
            </div>
            <div className="mx-auto font-bold text-3xl text-center bg-white/25 w-full h-full justify-center items-center flex flex-col">
                <p>{bodyHead}</p>
                <p className="text-xs">{bodyText}</p>
            </div>
        </div>
    );
}

export default Node;
