import "@/App.css"
import Ticker from "@/components/Ticker"
import logo from "../assets/logo.png"
import ResponsiveDialog from "@/components/ResponsiveDialog"
function Waitlist() {


  return (
    <div className='px-8 w-screen h-screen bg-[#0066cc] blueprint-background text-white flex flex-col items-center pt-16'>

      <img src={logo} alt="bluprnt logo" className="w-[400px] " />

      {/*text  */}
      <div className="flex flex-col items-center justify-center mt-6 gap-5">

        <h1 className="lg:text-4xl text-xl text-center font-marker"> &quot;Architect Your Software Projects <span className="brush-stroke brush-stroke::before ">in Minutes</span> &quot; </h1>

        <h3 className="text-xs w-2/3 lg:w-2/3 lg:text-[14px] mt-2  text-white opacity-80  font-jetMono  text-center  ">Get complete development flowchart and technical roadmap <br className="hidden lg:block" />powered by AI.</h3>
      </div>


      {/* button */}

      <div className="relative flex justify-center items-center mt-20">
        {/* Image as background */}
        {/* <img
          src={border}
          alt="button border"
          className="lg:w-60 w-40 self-center -z-10 absolute"
        /> */}


        <ResponsiveDialog />
      </div>


      {/* new members which joined wishlist */}
      <div className="bg-[#ffffff20] rounded-full px-2 w-auto mt-3">
        <span className="text-white text-sm lg:text-lg opacity-100 text-center">@tabish has joined the waitlist 🔥</span>
      </div>
 
      <Ticker />
    </div>
  )
}


export default Waitlist 