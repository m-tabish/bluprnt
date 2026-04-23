/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Handle, Position } from "@xyflow/react";
import { useSelector } from "react-redux";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';



export default function CustomNode({ data }) {
    const colorMode = useSelector((state) => state.colorModeGlobal);
    const parsedData = JSON.parse(data.label);


    // dark and light theme classes
    const darkClass = 'border border-black text-black bg-white';
    const lightClass = 'border border-black text-white bg-black';
    // const currentClass = colorMode === 'dark' ? darkClass : lightClass;
    const currentClass = "bg-white"


    return (
        <div className="flex gap-2 items-center relative  ">
            <div className={`relative text-center font-bold rounded-lg w-[200px] h-auto min-h-[50px] text-xs whitespace-normal p-1 flex flex-col justify-center items-center gap-1 ${currentClass}`}>

                <Handle type="target" position={Position.Top} id="1" />
                {parsedData.process.length > 100 ? parsedData.process.slice(0, 100) + "..." : parsedData.process}

                {/* Code button */}
                <Dialog >
                    <DialogTrigger className="bg-[#3f46a5] py-1 px-3 text-white rounded-sm">Code</DialogTrigger>
                    <DialogContent className=" max-w-2xl max-h-[500px] overflow-scroll ">
                        <DialogHeader>
                            <DialogTitle className=" ">Code</DialogTitle>
                            <DialogDescription className="max-h-1/2 max-w-4xl whitespace-pre-wrap  break-words">
                                <div className="m-1  ">{JSON.stringify(parsedData.description)}</div>
                                <SyntaxHighlighter wrapLongLines={true} language="javascript" style={vs2015}>
                                    {parsedData.code}
                                </SyntaxHighlighter>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                {/* Resources Button */}
                <Dialog>
                    <DialogTrigger className="bg-[#3b6697] px-3 py-1 text-center  rounded-sm text-white">Resources</DialogTrigger>
                    <DialogContent className="max-h-1/2 max-w-2xl ">
                        <DialogHeader>
                            <DialogTitle>Resources</DialogTitle>

                            {parsedData.resources.length !== 0 ? (
                                <DialogDescription className="max-w-4xl whitespace-pre-wrap  break-words">
                                    <ul>
                                        {parsedData.resources.map((res, idx) => (
                                            <a className="text-blue-600 whitespace-pre-wrap underline underline-offset-1 " target="_blank" href={`${res}`} key={idx}>

                                                {res + "\n"}
                                            </a>
                                        ))}
                                    </ul>
                                </DialogDescription>
                            ) : (
                                "No resources for this"
                            )}

                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                <Handle type="source" position={Position.Bottom} id="1" />
            </div>
        </div >
    );
}





