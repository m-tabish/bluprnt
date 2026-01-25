/* eslint-disable no-unused-vars */
import { Analytics } from "@vercel/analytics/react";
// Remove axios import, it is handled in your hook service
// import axios from "axios";

import bg from "@/assets/2.jpg";
import logo from "@/assets/logo.png";
import AllProjects from "@/components/AllProjects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/firebase/authContext";
import { useCreateProject } from "@/hooks/useCreateProject";
import { useProjects } from "@/hooks/useProjects";
import { ArrowDown, Loader2 } from "lucide-react";
import { useState } from "react"; // Added useEffect if you need to react to status changes
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
function Dashboard() {

    const { userLoggedIn } = useAuth();
    const serverURL = useSelector(state => state.serverURL);
    const [reloadTrigger, setReloadTrigger] = useState(0);

    const { projects, error } = useProjects(serverURL, reloadTrigger);
    const { submitProject, loading, status } = useCreateProject(serverURL);

    const [input, setInput] = useState({
        project: "",
        projectDescription: "",
        language: ""
    });

    if (!projects) {
        console.log("No projects found" + error);
    }
    // Submit button function
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 2. Use the variables from the hook, not local state
        if (!loading && input.project && input.projectDescription && input.language) {

            // 3. Call the function exposed by your hook
            await submitProject(input);
            setReloadTrigger(prev => prev + 1);
        }
    };

    if (!userLoggedIn) return (<Navigate to={'/login'} replace={true} />)

    return (
        <div className={`h-screen bg-cover bg-fixed bg-center m-auto bg-black/10 text-white overflow-none shadow-none bg-no-repeat overflow-x-hidden items-center flex flex-col `} style={{ backgroundColor: "black", backgroundImage: `url(${bg})`, backgroundBlendMode: 'hard-light', opacity: "90%" }}>
            <Analytics />

            <div className='h-screen sm:mt-36 flex flex-col min-w-screen justify-center items-center overflow-visible overscroll-contain'>
                <div className="flex flex-col gap-3 scroll-my-0">

                    <div className='text-center flex flex-col text-black tracking-wider mb-10 flex-wrap items-center'>
                        <div className="hover:underline text-transparent h-24 mx-auto bg-center font-extrabold justify-end w-3/4 flex items-center gap-10 z-10 text-3xl " target="_blank" rel="noopener noreferrer " style={{ backgroundImage: `url(${logo})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}>
                        </div>
                        <div className="text-2xl font-semibold text-white">Generate a Roadmap for your next project.</div>
                        <div className="text-base  text-white font-bold">made with 💙 by <a href="https://www.tabishcodes.me" className="underline text-white">Tabish</a> <ArrowDown size={"1em"} className=" inline animate-bounce" />
                        </div>
                    </div>

                    {/* Project Form  */}

                    <form onSubmit={handleSubmit} className='flex flex-col w-3/4 m-auto p-auto gap-3'>
                        <span className="flex flex-col gap-2">
                            <label className="text-lg w-auto font-bold ">Project Name</label>
                            <Input
                                type="text"
                                className=' text-black outline-none bg-white/90 placeholder:text-black focus:outline-none active:outline-none active:ring-0 focus:ring-0'
                                value={input.project}
                                onChange={(e) => setInput({ ...input, project: e.target.value })}
                                placeholder="Project Name"
                                required
                                minLength={1}
                            /></span>
                        <span className="flex flex-col gap-2">
                            <label className="text-lg font-bold ">Project Description</label>
                            <Textarea
                                type="text"
                                className=' text-black outline-none active:border bg-white/90 placeholder:text-black'
                                onChange={(e) => setInput({ ...input, projectDescription: e.target.value })}
                                placeholder="Description of your project"
                                value={input.projectDescription}
                                required
                                minLength={1}
                            />
                        </span>
                        <span className="flex flex-col gap-2 ">
                            <label className="text-lg font-bold ">Language and Frameworks</label>
                            <Input
                                type="text"
                                className=' text-black outline-none active:border focus:ring-0 bg-white/90 placeholder:text-black border-none'
                                onChange={(e) => setInput({ ...input, language: e.target.value })}
                                placeholder="Javascript..."
                                value={input.language}
                                required
                                minLength={1}
                            />
                            <Button
                                type='submit'
                                className=' bg-transparent hover:border-1 hover:border-black shadow-lg hover:bg-blue-200 hover:text-blue-600 shadow-blue-600 text-2xl font-bold text-white p-1 mt-10 '
                                variant="outline"
                                disabled={loading} // Good practice to disable button while loading
                            >
                                {loading ?
                                    (<Loader2 className="mr-2 h-4 w-4 animate-spin " />) :
                                    ('Submit')
                                }
                            </Button>

                            {/* 4. Use status from the hook for UI Feedback */}
                            {status === "failed" ?
                                (<div className="text-red-600 font-semibold w-full text-sm text-center"> Error Generating content. Please refresh the page and try again.</div>)
                                : status === "success" ?
                                    (<div className="text-teal-300 font-semibold w-full text-sm text-center"> Successfully Generated your roadmap. Scroll to find it.</div>)
                                    : (<div className="text-white font-semibold w-full text-sm text-center">Click to Generate</div>)
                            }

                        </span>
                    </form>
                </div>
            </div >

            {/* Showing all the projects made till now  */}
            <div className=" w-full text-center text-4xl mt-[10%] font-mono text-white/80">Check out what people have made <ArrowDown className="hover:translate-y-3 inline animate-bounce" /></div>


            {Array.isArray(projects) && projects.length > 0 ? (([...projects].reverse()).map((project, index) => (
                <AllProjects className={" text-white relative  -z-1  "} project={project} key={project._id} />
            ))) : (<div>No projects found</div>)}


        </div >
    );
}

export default Dashboard;