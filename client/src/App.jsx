import { useEffect, useState } from 'react';
import './App.css';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { ArrowDown, Loader } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProjectInfo from './components/ProjectInfo';
import { useDispatch } from 'react-redux';
import { storeBluprnts } from "@/slices/projectSlice"

export default function App() {

  const [user, setUser] = useState({ username: "Anon" });

  const [prompt, setPrompt] = useState("")
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();
  const serverURL = useSelector(state => state.serverURL)
  const dispatch = useDispatch()
  async function sendPrompt() {
    if (prompt) {
      const result = await axios.post(`${serverURL}/create-project`, {
        prompt
      });

    }
  }


  async function handlePrompt(e) {
    e.preventDefault();

    try {
      const result = await axios.post(`${serverURL}/create-projects`, {
      })
    } catch (error) {
      console.error("Error in home", error)
    }
    setPrompt(e.target.value)
    console.log(prompt)
  }

  const fetchProjects = async () => {
    try {
  
      // const result = await axios.get(`${serverURL}/projects`)
      const result = await axios.get(`http://localhost:3000/projects`)
      if (!result) {
        console.log("No projects found")
      }
      setProjects(result.data);
      dispatch(storeBluprnts(result.data))
      setLoading(false)

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
          value={prompt}
          className="w-2/4 bg-white/20 backdrop-blur-sm placeholder:text-md placeholder:text-white/100 placeholder:font-jetMono rounded-md text-white font-jetMono min-h-20 max-h-56 overscroll-contain  "
          placeholder="Generate a Bluprnt by entering your Project's Name, Description, Tech Stack etc."
          onInput={(e) => {
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
            handlePrompt(e)
          }}
          onClick={() => sendPrompt()}
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
        <h1 className='mt-14 text-5xl font-marker '>Your Bluprnts</h1>
        <div className=" grid grid-cols-1 w-3/5 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects?.map((project, index) => (
            <div className='w-full h-full' key={index}>
              <ProjectInfo project={project} />
            </div>
          )
          )
          }
        </div>
      </section>}

    </div >
  );
}






