/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import { deleteProjectService } from "@/services/projectService";
import { viewProject } from "@/slices/projectSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

function AllProjects({ className, project }) {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const view = useSelector(state => state.viewProject)
    const [deleteId, setDeleteId] = useState("")
    function clickedView(id) {
        dispatch(viewProject(id))
        navigate("/app/map/" + id)
    }

    useEffect(() => {

        if (deleteId) {
            const performDelete = async () => {
                const result = await deleteProjectService(deleteId);
                if (result) {
                    setDeleteId("")
                    return "Item deleted Succesfully"
                }
                else {
                    return "Item could not be deleted"
                }
            }

            performDelete()
        }
    }, [deleteId, setDeleteId])

    return (
        <Card className={`${className} bg-transparent w-full flex flex-col md:flex-row p-4 rounded outline-none border-none justify-between items-center gap-4`} >
            {/* 1. Header (Title & Tags) - Left column */}
            <CardHeader className="w-full md:w-1/4 text-left flex text-white p-2">
                <CardTitle className="text-lg flex flex-col gap-2 font-semibold border-none outline-none">
                    {project.projectName || project.projectname}
                    <div className="flex flex-wrap gap-1 mt-1">
                        {project.technologies && project.technologies.map((lang, index) => (
                            <Badge
                                key={index}
                                variant={"outline"}
                                className="text-xs border-white/30 text-white/60"
                            >
                                {lang.trim()}
                            </Badge>
                        ))}
                    </div>
                </CardTitle>
            </CardHeader>

            {/* 2. Content (Description) - Middle column */}
            <CardContent className="w-full md:w-2/4 flex items-center font-sans p-2 text-white/80">
                <p className="text-sm line-clamp-3 md:line-clamp-none">
                    {project.projectDescription}
                </p>
            </CardContent>

            {/* 3. Footer (Action Buttons) - Right column */}
            <CardFooter className="w-full md:w-1/4 flex justify-end gap-2 p-2">
                <Button className="bg-white text-black hover:text-white" onClick={() => clickedView(project.id)}>
                    View
                </Button>
                <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfPaKwDIXYElN8y62tHemR1Y6qJODqNN087dPEApgNJtCrXdw/viewform?usp=sharing"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Button className="active:bg-[#2d66bd]">Feedback</Button>
                </a>
            </CardFooter>
        </Card>
    );

}
export default AllProjects
