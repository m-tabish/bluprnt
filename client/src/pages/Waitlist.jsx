import "@/App.css"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import brush from "../assets/brush.svg"
import icon1 from "../assets/icon1.png"
import icon2 from "../assets/icon2.png"
import icon3 from "../assets/icon3.png"
import icon4 from "../assets/icon4.png"
import plus2 from "../assets/plus2.png"
import logo from "../assets/logo.png"
import ResponsiveDialog from "@/components/ResponsiveDialog"

function Waitlist() {
  const [submitted, setSubmitted] = useState(false);
 
 
  return (
    <div className='w-screen absolute -z-20 overflow-y-hidden bg-[#0066cc] blueprint-background text-white flex flex-col items-center justify-center pt-36 lg:gap-0 gap-8'>
      <img src={logo} alt="bluprnt logo" className="w-[250px] lg:w-[400px] -mt-36" />

      {/*text  */}
      <div className="flex flex-col items-center justify-center lg:mt-6 gap-2 lg:gap-5 min-h-full">
        <h1 className="lg:text-5xl min-h-full text-3xl text-center font-marker px-4">
          &quot;Architect Your Software Projects
          <span className="text-primary relative inline-block ">
            <img
              src={brush}
              alt="brush stroke "
              className="absolute w-full top-1/5 lg:h-[70px] h-full object-cover -z-10 opacity-100 ml-1"
            />
            <span className="relative px-3"> in Minutes</span>
          </span>
          &quot;
        </h1>
        <h3 className="text-md lg:text-lg lg:w-2/3  mt-4 text-white opacity-80 font-jetMono text-center mb-8 text-balance">
          Get complete development flowchart and technical roadmap <br className="hidden lg:block" />powered by AI.
        </h3>
      </div> 


      {/* button */}

      <ResponsiveDialog submit={submitted} setSubmit={setSubmitted}></ResponsiveDialog>

      <p className="absolute bottom-28 opacity-80 text-center">4 users have already joined the waitlist🩵🩵🩵 </p>






      {/* <Ticker /> */}
    </div >
  )
}

export default Waitlist