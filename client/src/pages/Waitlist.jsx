import "@/App.css"
import ResponsiveDialog from "@/components/ResponsiveDialog"
import Ticker from "@/components/Ticker"
import brush from "../assets/brush.svg"
import border from "../assets/button_border.svg"
import logo from "../assets/logo.png"
function Waitlist() {
  return (
    <div className='w-screen absolute -z-20 overflow-y-hidden bg-[#0066cc] blueprint-background text-white flex flex-col items-center justify-center'>
      <img src={logo} alt="bluprnt logo" className="w-[250px] lg:w-[400px]" />



      {/*text  */}
      <div className="flex flex-col items-center justify-center mt-8 lg:mt-6  gap-2 lg:gap-5 min-h-full">

        <h1 className="lg:text-4xl min-h-full text-lg text-center font-marker px-4">
          &quot;Architect Your Software Projects
          <span className="text-primary relative inline-block "
          >
            <img
              src={brush}
              alt="brush stroke"
              className="absolute w-full lg:h-[50px] h-full object-cover -z-10 opacity-100 "
            />
            <span className="relative   px-2 "> in Minutes</span>
          </span>
          &quot;
        </h1>


        <h3 className="text-xs w-2/3 lg:w-2/3 lg:text-[14px] mt-4 text-white opacity-80 font-jetMono text-center">
          Get complete development flowchart and technical roadmap <br className="hidden lg:block" />powered by AI.
        </h3>
      </div>

      {/* button */}
      <div className="relative w-64 h-20    inline-block mt-8 lg:mt-12">
        {/* Image as background */}
        <img
          src={border}
          alt="button border"
          className="absolute  -inset-y-5  lg:scale-125  -z-10"
        />
        <span className="relative z-10 min-w-full inset-y-2 h-16 flex items-center justify-center ">
          <ResponsiveDialog />
        </span>
      </div>

      {/* new members which joined wishlist */}


      <Ticker />
    </div>
  )
}

export default Waitlist