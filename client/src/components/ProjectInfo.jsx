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
import "../App.css"
import userImage from '../assets/navlogo.png'
import { Button } from "./ui/button"
import { TypographyP, TypographySmall } from "./ui/typography"
import { useNavigate } from "react-router-dom"


function ProjectInfo({ project, className }) {
    const navigate = useNavigate();
    return (


        <Card className={cn("bg-white/70 max-w-sm my-3 h-96 flex flex-col justify-between rounded-lg", className)}>
            <CardHeader className="p-2">
                <CardDescription className="flex justify-between items-center">
                    <div className="flex items-center gap-2 w-full ">
                        <img src={userImage} alt="" className="w-10 h-10 object-contain  rounded-full m-2 p-0.5" />
                        <TypographySmall>{project.createdBy || "User"}</TypographySmall>
                    </div>
                    <TypographySmall className="mr-3">{""}</TypographySmall>
                </CardDescription>
            </CardHeader>

            <CardContent className="flex-1 px-4 overflow-hidden">
                <div className="text-sm max-h-64 overflow-y-scroll scroll-container"  >
                    
                    <TypographyP>{project.projectDescription}</TypographyP>
                </div>
            </CardContent>
            

            <CardFooter className="bg-white py-2 border-t flex justify-between items-center rounded-lg rounded-t-none">
                <CardTitle className="text-base font-marker text-center w-full text-balance">{project.projectname}</CardTitle>
                <Button variant="link" className="p-0  m-0" onClick={() => navigate(`map/${project._id}`)}>
                    <ArrowRightCircle className="text-amber-500  " style={{ minWidth: "2rem", minHeight: "2rem" }} />
                </Button>
            </CardFooter>
        </Card>

    )
}

export default ProjectInfo  