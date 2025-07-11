import { useEffect, useState } from 'react';
import './App.css';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { ArrowDown, Loader } from 'lucide-react';
import { useSelector } from 'react-redux';
import ProjectInfo from './components/ProjectInfo';
import { useRef } from 'react';


export default function App() {

  const [user, setUser] = useState({ username: "Anon" });
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const serverURL = useSelector(state => state.serverURL)
  console.log(serverURL)


  const fetchProjects = async () => {
    try {

      // const result = await axios.get(`${serverURL}/projects`)
      const result = await axios.get(`http://localhost:3000/projects`)
      if (!result) {
        console.log("No projects found")
      }
      setProjects(result.data);
      setLoading(false)
      console.log(result.data)
      return result.data;
    }
    catch (e) {
      console.error(e)
    }

  };
  useEffect(() => {
    fetchProjects();
  }, [serverURL])


  return (
    <div className="bluprnt-background min-h-screen font-jetMono  w-screen overflow-x-hidden text-white">
      <section className=" flex flex-col items-center justify-center h-screen w-screen gap-6">
        <h1 className="text-4xl  text-white text-center font-bold mb-4 font-marker tracking-wider">Welcome, {user.username}</h1>
        <Textarea
          className="w-2/4 bg-white/20 backdrop-blur-sm placeholder:text-md placeholder:text-white/100 placeholder:font-jetMono   text-white font-jetMono min-h-20 max-h-56 overscroll-contain  "
          placeholder="Generate a Bluprnt by entering your Project's Name, Description, Tech Stack etc."
          onInput={(e) => {
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
          }}
        />
        <Button
          className="text-lg sm:text-xl self-center lg:text-2xl p-3 sm:p-4 w-fit mx-auto lg:mx-0 h-auto font-marker   shadow-[12px_19px_30px_-13px_rgba(0,_0,_0,_0.3)] border-2 hover:border-white hover:border-2 hover:text-white  rounded-[40px] active:border-black backdrop-blur-xs bg-white/20 hover:bg-white/20 border-white/20 mt-4 lg:mt-8"
        >
          Generate
        </Button>

        <div className='mt-14 text-lg font-jetMono flex flex-col items-center'>
          or scroll to explore
          <ArrowDown className='transition-all animate-bounce mt-2' />
        </div>
      </section>
      {/* ______________________________________________- */}

      {/* Explore */}
      {loading === true ? <Loader className='w-full ' size={30}>Loading</Loader> : <section className='  flex flex-col items-center  w-screen h-screen gap-10'>
        <h1 className='mt-14 text-5xl font-marker '>Explore</h1>
        <div className=" grid grid-cols-1 w-3/5 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects?.map((project, index) => (<div className='w-full h-full' key={index}><ProjectInfo project={project}  /></div>))}
        </div>
      </section>}

    </div >
  );
}










// {
//   /* eslint-disable no-unused-vars */
//   import { Analytics } from "@vercel/analytics/react";
//   import axios from "axios";

//   import { ArrowDown, Loader2 } from "lucide-react";
//   import { useEffect, useState } from "react";
//   import { useDispatch, useSelector } from "react-redux";
//   import { Navigate } from "react-router-dom";
//   import bg from "./assets/2.jpg";
//   import logo from "./assets/logo.png";
//   import AllProjects from "./components/AllProjects";
//   import Socials from "./components/Socials";
//   import { Button } from "./components/ui/button";
//   import { Input } from "./components/ui/input";

//   import { Textarea } from "./components/ui/textarea";
//   import { useAuth } from "./firebase/authContext";
//   import { addProject } from "./slices/projectSlice";
//   function App() {


//     const { userLoggedIn } = useAuth();
//     async function call_backend() {
//       try {
//         const resp = await axios.get(`${serverURL}/projects`)
//         // console.log('backend hit', resp.data);
//       }
//       catch (e) {
//         console.log(e)
//       }

//     }

//     useEffect(() => {
//       call_backend()
//     }, [])

//     // Stores all the projects made till now 
//     const [projects, setProjects] = useState([]);
//     const [loading, setLoading] = useState(false)
//     const [input, setInput] = useState({
//       project: "",
//       projectDescription: "",
//       language: ""
//     });
//     const [generation, setGeneration] = useState("")

//     const dispatch = useDispatch();


//     const serverURL = useSelector(state => state.serverURL)

//     // console.log(serverURL);

//     // Fetches all the projects
//     useEffect(() => {
//       const fetchProjects = async () => {
//         try {
//           const projectsData = await axios.get(`${serverURL}/projects`);
//           // console.log(serverURL)

//           setProjects(projectsData.data)
//         } catch (error) {
//           console.error("Error fetching projects:", error);
//         }
//       };
//       fetchProjects();
//     }, [loading, generation, serverURL]);


//     //  Submit button function : Runs when submit is clicked
//     const handleSubmit = async (e) => {
//       setGeneration("")
//       setLoading(false)
//       e.preventDefault();
//       if (input.project && input.projectDescription && input.language) {
//         setLoading(true)
//         // Dispatching the addProject action with the current input
//         dispatch(addProject({
//           project: input.project,
//           projectDescription: input.projectDescription,
//           language: input.language
//         }));

//         // Sending the user input to the GenAI API using post method
//         try {

//           const response = await axios.post(`${serverURL}/create-project`, {
//             projectname: input.project,
//             projectDescription: input.projectDescription,
//             language: input.language
//           });
//           if (response) {
//             setGeneration("success")
//           }
//           setLoading(false)
//         } catch (e) {
//           setGeneration("failed")
//           setLoading(false)
//           console.log("Post request not sent", e);
//         }
//       }
//     };


//     if (!userLoggedIn) return (<Navigate to={'/login'} replace={true} />)
//     return (

//       <div className={`h-screen  bg-cover bg-fixed  bg-center m-auto bg-black/10 text-white overflow-none  shadow-none  bg-no-repeat  overflow-x-hidden items-center flex flex-col`}>
//         <Analytics />


//         <div className=" fixed -z-20 inset-0 bg-cover bg-center " style={{ backgroundImage: `url(${bg})`, backgroundBlendMode: 'hard-light', opacity: "90%" }}>
//           <Socials className={'absolute top-1/3 bg-white rounded-sm'} />
//         </div>

//         <div className='h-screen mt-24  flex flex-col  min-w-screen justify-center items-center overflow-visible overscroll-contain'>
//           <div className="flex flex-col gap-3 scroll-my-0">

//             <div className='text-center flex flex-col  text-black   tracking-wider mb-10 flex-wrap  items-center'>
//               <div className="hover:underline  text-transparent h-24 mx-auto bg-center  font-extrabold  justify-end w-3/4 flex items-center gap-10 z-10 text-3xl " target="_blank" rel="noopener noreferrer " style={{ backgroundImage: `url(${logo})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}>

//               </div>
//               <div className="text-2xl font-semibold  text-white">Generate a Roadmap for your next project.</div>
//               <div className="text-base font-semibold  text-white/60">Scroll down to see latest roadmaps <ArrowDown size={"1em"} className=" inline animate-bounce" />
//               </div>
//             </div>


//             {/* Project Form  */}
//             <form onSubmit={handleSubmit} className='flex flex-col w-3/4 m-auto p-auto gap-3'>
//               <span className="flex flex-col gap-2">
//                 <label className="text-lg w-auto font-bold active:border ">Project Name</label>
//                 <Input
//                   type="text"
//                   className='  text-black outline-none  bg-white/90 placeholder:text-black/30
//                   focus:outline-none active:outline-none active:ring-0 focus:ring-0'
//                   value={input.project}
//                   onChange={(e) => setInput({ ...input, project: e.target.value })}
//                   placeholder="Project Name"
//                   required
//                   minLength={1}

//                 /></span>
//               <span className="flex flex-col gap-2">
//                 <label className="text-lg font-bold  ">Project Description</label>
//                 <Textarea
//                   type="text"
//                   className='  text-black  outline-none  active:border    bg-white/90 placeholder:text-black/30'
//                   onChange={(e) => setInput({ ...input, projectDescription: e.target.value })}
//                   placeholder="Description of your project"
//                   value={input.projectDescription}
//                   required
//                   minLength={1}
//                 />
//               </span>
//               <span className="flex flex-col gap-2 ">
//                 <label className="text-lg font-bold  ">Language and Frameworks</label>
//                 <Input
//                   type="text"
//                   className='  text-black outline-none  active:border focus:ring-0 bg-white/90 placeholder:text-black/30 border-none'
//                   onChange={(e) => setInput({ ...input, language: e.target.value })}
//                   placeholder="Javascript..."
//                   value={input.language}
//                   required
//                   minLength={1}
//                 />
//                 <Button
//                   type='submit'
//                   className=' bg-transparent    hover:border-1 hover:border-black  shadow-lg hover:bg-blue-200 hover:text-blue-600 shadow-blue-600 text-2xl font-bold text-white p-1  mt-10 '
//                   variant="outline"
//                 >

//                   {loading ?
//                     (<Loader2 className="mr-2 h-4 w-4 animate-spin " />) :
//                     (
//                       'Submit'
//                     )}
//                 </Button>
//                 {generation === "failed" ? (<div className="text-red-600 font-semibold w-full text-sm text-center"> Error Generating content. Please refresh the page and try again.</div>) : generation === "success" ?
//                   (<div className="text-teal-300  font-semibold w-full text-sm text-center"> Successfully Generated your roadmap. Scroll to find it.</div>) : (<div className="text-white font-semibold w-full text-sm text-center">Click to Generate</div>)}

//               </span>
//             </form>


//           </div>

//         </div >




//         {/* Showing all the projects made till now  */}

//         <div className="  w-full text-center text-4xl mt-[10%] font-mono text-white/80">Check out what people have made <ArrowDown className="hover:translate-y-3 inline animate-bounce" /></div>


//         {projects ? ((projects.reverse()).map((project, index) => (
//           <AllProjects className={" text-white relative  z-50 "} project={project} key={project._id} />
//         ))) : (<div>No projects found</div>)}


//       </div >
//     );
//   }

//   export default App;
// }