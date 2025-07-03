import "@/App.css"
import ResponsiveDialog from "@/components/ResponsiveDialog"
import { useState } from "react"
import brush from "../assets/brush.svg"
import border from "../assets/button_border.svg"
import logo from "../assets/logo.png"
function Waitlist() {
  const [submitted, setSubmitted] = useState(false);
  const [url, setUrl] = useState(" https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeG1mcHFrenVsMG5ydW92djdxeWMzamJsM3A3NDVqNWx4eWVqa3E1dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SlUoV8xKS5tB11g151/giphy.gif");
  const [submittedUrl, setSubmittedUrl] = useState("https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbThxZWt1OXkxdHMxN2o3YXI2dzllODN0eXc2dzg1c3F4NWN2b2g5YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/j5LtiPejjd5pLsSX2U/giphy.gif");

  return (
    <div className='w-screen absolute -z-20 overflow-y-hidden bg-[#0066cc] blueprint-background text-white flex flex-col items-center justify-center pt-36'>
      <img src={logo} alt="bluprnt logo" className="w-[250px] lg:w-[400px] -mt-36" />

      {/*text  */}
      <div className="flex flex-col items-center justify-center lg:mt-6 gap-2 lg:gap-5 min-h-full">
        <h1 className="lg:text-4xl min-h-full text-lg text-center font-marker px-4">
          &quot;Architect Your Software Projects
          <span className="text-primary relative inline-block">
            <img
              src={brush}
              alt="brush stroke "
              className="absolute w-full lg:h-[50px] h-full object-cover -z-10 opacity-100"
            />
            <span className="relative px-2"> in Minutes</span>
          </span>
          &quot;
        </h1>
        <h3 className="text-xs w-2/3 lg:w-2/3 lg:text-[14px] mt-4 text-white opacity-80 font-jetMono text-center mb-8">
          Get complete development flowchart and technical roadmap <br className="hidden lg:block" />powered by AI.
        </h3>
      </div>

      {/* button */}
      {/* Join us */}
      <img src={submitted ? submittedUrl : url} alt="" className="lg:mt-12 mt-12 w-48 mb-6 rounded-lg" />
      <div className={`relative w-64 h-20 inline-block disabled`}>
        {/* Image as background */}
        {!submitted && <img
          src={border}
          alt="button border"
          className="absolute -inset-y-5 lg:scale-125 -z-10"
        />}
        <span className="relative z-10 min-w-full inset-y-2 h-16 flex items-center justify-center">
          <ResponsiveDialog submit={submitted} setSubmit={setSubmitted} />
        </span>
      </div>

      {/* new members which joined wishlist */}
      {/* <Ticker /> */}
    </div>
  )
}

export default Waitlist