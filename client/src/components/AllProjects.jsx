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
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

function AllProjects({ className, project }) {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const view = useSelector(state => state.viewProject)
    const [deleteId, setDeleteId] = useState("")
    const [isExpanded, setIsExpanded] = useState(false);

    const hasLongDescription = project.projectDescription && project.projectDescription.length > 200;

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
        <Card className={`${className} bg-transparent mx-auto w-4/5 flex flex-col md:flex-row p-4 rounded outline-none border-none justify-between items-center gap-4`} >
            {/* 1. Header (Title & Tags) - Left column */}
            <CardHeader className="w-full md:w-1/4 text-left flex text-white p-2">
                <CardTitle className="text-lg flex flex-col gap-2 font-semibold border-none outline-none">
                    {project.projectName || project.projectname}
                    <div className="flex flex-wrap gap-1 mt-1">
                        {(() => {
                            const rawTags = project.tags || project.technologies || [];
                            const tagsArray = Array.isArray(rawTags)
                                ? rawTags.flatMap(t => typeof t === 'string' ? t.split(',').map(s => s.trim()) : [])
                                : (typeof rawTags === 'string'
                                    ? rawTags.replace(/[{}]/g, "").split(',').map(s => s.trim())
                                    : []);

                            return tagsArray.filter(Boolean).map((lang, index) => (
                                <Badge
                                    key={index}
                                    variant="outline"
                                    className="text-xs border-white/30 text-white/60"
                                >
                                    {lang}
                                </Badge>
                            ));
                        })()}
                    </div>
                </CardTitle>
            </CardHeader>

            {/* 2. Content (Description) - Middle column */}
            <CardContent className="w-full md:w-2/4 flex flex-col justify-center font-sans p-2 text-white/80">
                <p className="text-sm leading-relaxed">
                    {hasLongDescription && !isExpanded
                        ? `${project.projectDescription.substring(0, 200)}...`
                        : project.projectDescription}
                </p>
                {hasLongDescription && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-xs text-blue-400 hover:text-blue-300 mt-2 flex items-center gap-1 focus:outline-none w-fit font-semibold"
                    >
                        {isExpanded ? (
                            <>
                                Show Less <ChevronUp className="w-3.5 h-3.5" />
                            </>
                        ) : (
                            <>
                                Show More <ChevronDown className="w-3.5 h-3.5" />
                            </>
                        )}
                    </button>
                )}
            </CardContent>

            {/* 3. Footer (Action Buttons) - Right column */}
            <CardFooter className="w-full md:w-1/4 flex justify-around gap-2 p-2">
                <Button className="bg-white text-black hover:text-white" onClick={() => clickedView(project.id)}>
                    View
                </Button>
                <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfPaKwDIXYElN8y62tHemR1Y6qJODqNN087dPEApgNJtCrXdw/viewform?usp=sharing"
                    target="_blank"
                    rel="noreferrer"
                >
                    {/* <Button className="active:bg-[#2d66bd]">Feedback</Button> */}
                </a>
            </CardFooter>
        </Card >
    );

}
export default AllProjects
