/* eslint-disable react/prop-types */
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ArrowRightCircle } from "lucide-react"
import userImage from '../assets/navlogo.png'
import { Button } from "./ui/button"
import { TypographyP, TypographySmall } from "./ui/typography"


function ProjectInfo({ project, className }) {

    return (


        <Card className={cn(`bg-white/70 max-w-sm my-10 h-96 `, className)}>
            <CardHeader className="m-0 p-0 flex  justify-center">
                <CardDescription className="m-0 text-sm  px-2 justify-between pr-3  flex items-center ">
                    <div className="w-14 h-14 flex items-center gap-2  ">
                        <img src={userImage} alt="" className="bg-contain h-fit" />
                    </div>
                    <TypographySmall className="text-start p-1"> {project.createdBy || "User"}</TypographySmall>        <TypographySmall className=""> {new Date().toLocaleDateString('en-US')}</TypographySmall>
                </CardDescription>
            </CardHeader>

            <CardContent className=" mx-6 p-0 mb-2 ">
                <div className="h-auto overflow-y-clip flex flex-col  text-sm p-1  ">
                    {/* 1. Description (always clipped to fit) */}


                    {/* 2. Invisible spacer or button */}
                    {project.projectDescription.length >= 200 ? (
                        <div className="flex flex-col text-balance ">
                            <TypographyP>{project.projectDescription.slice(0, 200)}...</TypographyP>

                        </div>

                    ) : (
                        /* even when there's no button, this empty div
                           takes up the same space so the card height stays identical */
                        <TypographyP className="flex flex-col text-balance ">{project.projectDescription} </TypographyP>
                    )}

                </div>
                <Button variant="link" className="text-sm w-full relative justify-end">
                    Read More
                </Button>
            </CardContent>

            <CardFooter className="flex bg-white h-1/4    rounded-lg py-2      border-primary text-center">
                <CardTitle className="flex-1 text-lg font-marker text-balance tracking-wider">{project.projectname
                }</CardTitle>
                <Button variant="link" className=" min-h-full p-0 m-0 flex-end    ">
                    <ArrowRightCircle className="text-amber-500 " style={{ minWidth: "2em", minHeight: "2em" }} />
                </Button>
            </CardFooter>
        </Card>

    )
}

export default ProjectInfo  