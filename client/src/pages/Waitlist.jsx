import "@/App.css"
import { usePageTracking } from "@/components/GoogleAnalytics"
import ResponsiveDialog from "@/components/ResponsiveDialog"
import { Analytics } from "@vercel/analytics/react"
import { useState } from "react"
import brush from "../assets/brush.svg"
import logo from "../assets/logo.png"

function Waitlist() {
  const [submitted, setSubmitted] = useState(false);
  usePageTracking()

  return (
    <div className='w-screen absolute -z-20 overflow-y-hidden bg-[#0066cc] blueprint-background text-white flex flex-col items-center justify-center pt-36 lg:gap-0 gap-8'>     <Analytics />
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

      {/* <p className="absolute bottom-28 opacity-80 text-center font-bold">4 users have already joined the waitlist🩵🩵🩵 </p> */}






      {/* <Ticker /> */}
    </div >
  )
}

export default Waitlist