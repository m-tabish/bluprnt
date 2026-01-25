import brush from "@/assets/brush.svg"
import logo from "@/assets/logo.png"
import { LoginForm } from "@/components/login-form"
import { useAuth } from "@/firebase/authContext"
import { Navigate } from "react-router-dom"

export default function LoginPage() {

    const { userLoggedIn } = useAuth();
    if (userLoggedIn) {
        return <Navigate to="/app" replace={true} />
    }
    return (
        <div className="grid min-h-svh lg:grid-cols-2 overflow-y-hidden bluprnt-background px-2 ">

            <div className="  relative ml-14 hidden lg:block text-white ">


                <div className="w-full flex flex-col items-center justify-center lg:mt-6  lg:gap-5 min-h-full ">
                    <img src={logo} alt="bluprnt logo" className="w-[250px] lg:w-[400px] relative mb-10" />
                    <h1 className="lg:text-5xl min-h-full text-3xl text-center font-marker px-4">

                        &quot;Architect Your Software Projects
                        <span className="text-primary relative inline-block  mt-3">

                            <span className=" relative z-10    mx-0.5 -py-1 px-3 underline" style={{ backgroundImage: `url(${brush})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}> in Minutes {""}
                            </span>
                        </span>
                        &quot;
                    </h1>
                    <h3 className="text-md lg:text-lg lg:w-2/3  mt-4 text-white opacity-80 font-jetMono text-center mb-8 text-balance">
                        Get complete development flowchart and technical roadmap <br className="hidden lg:block" />powered by AI.
                    </h3>
                </div>
            </div>

            <div className="flex flex-col gap-4 p-6 md:p-10  text-white ">

                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm />
                    </div>
                </div>
            </div>


        </div>
    )
}
