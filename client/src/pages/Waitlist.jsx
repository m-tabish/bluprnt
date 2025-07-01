import "@/App.css"
import { Button } from "@/components/ui/button"
import border from "../assets/button_border.svg"
import logo from "../assets/logo.png"
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
        <img
          src={border}
          alt="button border"
          className="inline-block lg:w-60 w-40  self-center"
        />
        <Button className="lg:w-48 lg:h-16 w-32 rounded-none absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary font-marker font-bold border-transparent border-2 text-md bg-white hover:bg-primary hover:border-2 hover:border-blue-600 active:border-white active:border-2 hover:text-white transition-all duration-300">
          <span className="text-sm">  Join the waitlist</span>
        </Button>
      </div>

      {/* new members which joined wishlist */}
      <div className="bg-[#ffffff20] rounded-full px-2 w-auto mt-3">
        <span className="text-white text-sm lg:text-lg opacity-100 text-center">@tabish has joined the waitlist 🔥</span>
      </div>


      {/* ticker */}
      <div className="ticker bg-transparent h-8 absolute bottom-1 text-white">
        <div className="lg:ticker-content ticker-content-small  align-middle">
          Bluprnt is going under major revamp , we strongly encourage to <b className="text-orange-300">join the waitlist</b> !
        </div>
      </div>
    </div>
  )
}


export default Waitlist 