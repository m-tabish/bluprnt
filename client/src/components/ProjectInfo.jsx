/* eslint-disable react/prop-types */
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { ArrowRightCircle } from "lucide-react"
import userImage from '../assets/navlogo.png'
import { Button } from "./ui/button"

function ProjectInfo({
    createdBy = "tabish",
    description = "Mirai is an application designed to keep users updated on the latest research advancements. It utilizes Python, Hugging Face Transformers, and Streamlit to fetch, process, and present information from research papers and publications.",
    title = "Matrix",
    createdOn = "06/07/25"
}) {
    return (
        <div className="font-jetMono">

            <Card className="  max-w-sm bg-white/70">
                <CardHeader className="m-0 p-0 flex justify-center">
                    <CardDescription className="m-0 text-sm  px-2 justify-between pr-3  flex items-center ">
                        <div className="w-14 h-14 flex items-center gap-2  ">
                            <img src={userImage} alt="" className="bg-contain h-fit" />
                            <h1 className="">{createdBy.toUpperCase()}</h1>
                        </div>
                        <h1>{createdOn}</h1>
                    </CardDescription>
                </CardHeader>

                <CardContent className=" mx-6 p-0 mb-2 ">
                    <div className="h-52 overflow-hidden  flex flex-col  p-1 ">
                        {/* 1. Description (always clipped to fit) */}


                        {/* 2. Invisible spacer or button */}
                        {description.length >= 200 ? (
                            <div className="flex flex-col"><p>{description.slice(0, 200)}...</p><Button variant="link" className="text-sm self-end">
                                Read More
                            </Button></div>
                        ) : (
                            /* even when there's no button, this empty div
                               takes up the same space so the card height stays identical */
                            <div className="flex flex-col">{description} <div className="h-14"></div></div>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="flex bg-white   py-2   items-center justify-center border-t-2 border-primary text-center">
                    <CardTitle className="flex-1 min-h-full pl-14 font-marker ">{title}</CardTitle>
                    <Button variant="link" className="w-1/6 min-h-full p-0 m-0 flex-end  ">
                        <ArrowRightCircle className="text-amber-500 m-0 p-0" style={{ width: "2rem", height: "2rem" }} />
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default ProjectInfo  