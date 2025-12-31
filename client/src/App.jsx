import { useState } from 'react';
import './App.css';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowDown, Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import ProjectInfo from './components/ProjectInfo';
import { useCreateProject } from './hooks/useCreateProject';
import { useProjects } from './hooks/useProjects';

export default function App() {

  const [prompt, setPrompt] = useState("")
  const user = { username: "Anon" };


  const serverURL = useSelector(state => state.serverURL)
  const dispatch = useDispatch()


  const { projects, loading } = useProjects(serverURL)
  const { submitProjects } = useCreateProject(serverURL)



  const handleGenerate = async () => {
    if (!prompt) return;

    await submitProjects({
      project: prompt,
      projectDescription: prompt,
      language: "js"
    })


    setPrompt("");
  }


  return (
    <div className="bluprnt-background min-h-screen font-jetMono  w-screen overflow-x-hidden text-white">
      <section className=" flex flex-col items-center justify-center h-screen w-screen gap-6">
        <h1 className="text-4xl  text-white text-center font-bold mb-4 font-marker tracking-wider">Welcome, {user.username}</h1>
        <Textarea
          value={prompt}
          className="w-2/4 bg-white/20 backdrop-blur-sm placeholder:text-md placeholder:text-white/100 placeholder:font-jetMono rounded-md text-white font-jetMono min-h-20 max-h-56 overscroll-contain  "
          placeholder="Generate a Bluprnt by entering your Project's Name, Description, Tech Stack etc."

        />
        <Button
          onClick={handleGenerate}
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

      {/* PROJECTS */}
      <section className="flex flex-col items-center gap-10 pb-20">
        <h1 className="mt-14 text-5xl font-marker">
          Your Bluprnts
        </h1>

        {loading ? (
          <Loader2 className="animate-spin" size={32} />
        ) : (
          <div className="grid grid-cols-1 w-3/5 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.slice(0, 6).map((project) => (
              <ProjectInfo
                key={project._id}
                project={project}
              />
            ))}
          </div>
        )}
      </section>

    </div >
  );
}