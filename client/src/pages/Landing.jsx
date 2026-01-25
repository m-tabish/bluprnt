/* eslint-disable react/prop-types */
import logo from '@/assets/logo.png';
import Footer from '@/components/Footer';
import PillNav from '@/components/PillNav';
import ProjectInfo from '@/components/ProjectInfo.jsx';
import RippleGrid from '@/components/RippleGrid.jsx';
import { useAuth } from '@/firebase/authContext';
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { Link } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import peerlist_spotlight from "../assets/peerlist.png";
export default function Landing() {
    const { userLoggedIn } = useAuth();
    const [project, setProject] = useState([
        {
            createdBy: "tabish",
            description: "Mirai is an application designed to keep users updated on the latest research advancements. It utilizes Python, Hugging Face Transformers, and Streamlit to fetch, process, and present information from research papers and publications.",
            title: "Matrix",
            createdOn: "06/07/25"
        },
        {
            createdBy: "aron",
            description: "Mirai is an application designed to keep users updated on the latest research advancements. It utilizes Python, Hugging Face Transformers, and Streamlit to fetch, process, and present information from research papers and publications.",
            title: "Matrix",
            createdOn: "06/07/25"
        },
        {
            createdBy: "shubham",
            description: "Mirai is an application designed to keep users updated on the latest research advancements. It utilizes Python, Hugging Face Transformers, and Streamlit to fetch, process, and present information from research papers and publications.",
            title: "Matrix",
            createdOn: "06/07/25"
        },
        {
            createdBy: "alien",
            description: "TaskFlow is a productivity tool that helps teams manage their workflow efficiently. Built with React, Node.js, and MongoDB.",
            title: "TaskFlow",
            createdOn: "05/12/24"
        },
        {
            createdBy: "sara",
            description: "EcoTrack is an app for tracking and reducing your carbon footprint. Developed using Flutter and Firebase.",
            title: "EcoTrack",
            createdOn: "03/22/24"
        },
        {
            createdBy: "john",
            description: "FitBuddy is a fitness companion app that provides personalized workout plans. Built with Kotlin and AWS.",
            title: "FitBuddy",
            createdOn: "01/15/24"
        }
    ]);

    const [users, setUsers] = useState(3);
    const navigate = useNavigate();

    // if (userLoggedIn) return <Navigate to="/app" replace />;

    return (
        <div className=" bg-black   w-screen min-h-screen font-jetMono text-white ">


            {/* Hero Section */}
            <section className="relative mx-auto  flex flex-col  justify-center items-center overflow-hidden w-full h-screen">

                <PillNav

                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'About', href: '/about' },
                        { label: 'Services', href: '/services' },
                        { label: 'Contact', href: '/contact' }
                    ]}
                    activeHref="/"
                    className="custom-nav"
                    ease="power2.easeOut"
                    baseColor="#000000"
                    pillColor="#ffffff"
                    hoveredPillTextColor="#ffffff"
                    pillTextColor="#000000"
                    theme="light"
                    initialLoadAnimation={false}
                />
                <p className="absolute inset-0 flex items-center justify-center font-bold z-10 w-full text-center text-xl sm:text-2xl lg:text-3xl pointer-events-none">
                    Architect your projects in minutes
                </p>
                <RippleGrid
                    enableRainbow={false}
                    gridColor="#696969"
                    rippleIntensity={0.05}
                    gridSize={35}
                    gridThickness={20}
                    mouseInteraction={false}
                    mouseInteractionRadius={1.2}
                    opacity={0.8}
                    className="relative w-full h-4/5 -z-10"
                />
                <div>
                    <img src={logo} alt="" className='w-96 p-10' />
                </div>
            </section>
            <section className={`snap-start  mt-36   w-full h-screen flex flex-col justify-center items-center  text-white`}>
                <h1 className="   z-20 mb-12 relative sm:text-3xl lg:text-5xl font-bold font-marker text-white/90 drop-shadow-[0px_1.2px_1.2px_rgba(0,0,0,1)] ">
                    Featured
                </h1>

                <div className="w-screen h-screen mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-betwen ">
                    {/* Feature 1 */}
                    <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex flex-col items-center   gap-4">
                        <h2 className='font-jetMono text-center text-balance font-bold text-sm sm:text-base lg:text-xl xl:text-2xl px-4'>
                            Checkout what
                            Satvik Paramkusham,IITD Alumnus and
                            Founder of Build Fast with AI has to say.
                        </h2>

                        {/* <div className="twitter-tweet bg-[#15202b] rounded-lg p-4 text-white max-w-xl w-full">
                            <p>
                                We’ve just opened our waitlist for{' '}
                                <a href="https://t.co/yep5TnXY4t" className="text-blue-400 underline">https://t.co/yep5TnXY4t</a>
                                <br />— a space where you can design clear roadmaps and visualize your project flows without the clutter.
                                <br /><br />
                                If you like seeing your ideas take shape step by step, this might just click with you.
                                <br />
                                <a href="https://twitter.com/hashtag/BuildInPublic?src=hash&amp;ref_src=twsrc%5Etfw" className="text-blue-400 underline">#BuildInPublic</a>{' '}
                                <a href="https://twitter.com/hashtag/Waitlist?src=hash&amp;ref_src=twsrc%5Etfw" className="text-blue-400 underline">#Waitlist</a>{' '}
                                <a href="https://t.co/iueXSv1cWk" className="text-blue-400 underline">https://t.co/iueXSv1cWk</a>{' '}
                                <a href="https://t.co/IWEMFp1ETb" className="text-blue-400 underline">pic.twitter.com/IWEMFp1ETb</a>
                            </p>
                            <div className="mt-2 text-sm text-gray-400">
                                — Tabish (<a href="https://twitter.com/damnthesebugs" className="text-blue-400 underline">@damnthesebugs</a>){' '}
                                <a href="https://twitter.com/damnthesebugs/status/1940255444821557382?ref_src=twsrc%5Etfw" className="text-blue-400 underline">July 2, 2025</a>
                            </div>
                        </div> */}

                        {/* <div className='tweet-customizer-wrapper max-h-1/5 w-auto'>
                            <Tweet id="1840646848270492084"></Tweet>
                        </div> */}
                        <iframe width="600" height="315"
                            src="https://www.youtube.com/embed/BzTPJ4Mutww">
                        </iframe>

                    </div>

                    {/* Feature 2 */}
                    <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex flex-col items-center     gap-4">
                        <h2 className='font-jetMono text-center text-balance font-bold text-sm sm:text-base lg:text-xl xl:text-2xl px-4'>
                            Bluprnt (earlier Buildflow) featured on <a href="https://peerlist.io/tabish/project/build-flow" className='sm:text-2xl text-underline flex justify-center  gap-3 items-center text-center text-balance underline-1 underline' target='_blank'>Peerlist Spotlight<Link /></a>
                        </h2>
                        <img
                            src={peerlist_spotlight}
                            alt="peerlist spotlight"
                            className='w-full max-w-md lg:max-w-lg object-contain'
                        />

                    </div>
                </div>
            </section>

            {/* -------------------------------------------------------------------------- */}
            {/* Footer */}
            <Footer></Footer>
        </div>
    );
}





function BluprntCarousel({ bluprnt, className }) {
    const [sliderRef, slider] = useKeenSlider({
        loop: true,
        slides: {
            perView: 1,
            spacing: 15,
        }
    });

    return (
        <section className={`w-full h-screen flex flex-col justify-center items-center overflow-hidden px-4 sm:px-6 lg:px-8 ${className}`}>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 font-marker text-white/90 drop-shadow-[0px_1.2px_1.2px_rgba(0,0,0,1)] text-center">
                Bluprnt Library
            </h1>

            <div ref={sliderRef} className="keen-slider w-full max-w-2xl mb-8">
                {bluprnt.map((project, index) => (
                    <div key={index} className="keen-slider__slide flex  justify-center">
                        <ProjectInfo project={project} />
                    </div>
                ))}
            </div>

            <div className="flex gap-4">
                <button
                    onClick={() => slider.current?.prev()}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 border border-white/20 hover:border-white/40"
                >
                    ←
                </button>
                <button
                    onClick={() => slider.current?.next()}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 border border-white/20 hover:border-white/40"
                >
                    →
                </button>
            </div>
        </section>
    );
}





// function ProjectInfo({
//     createdBy = "tabish",
//     description = "Mirai is an application designed to keep users updated on the latest research advancements. It utilizes Python, Hugging Face Transformers, and Streamlit to fetch, process, and present information from research papers and publications.",
//     title = "Matrix",
//     createdOn = "06/07/25"
// }) {
//     return (
//         <div className="font-jetMono">

//             <Card className="  max-w-sm bg-white/70">
//                 <CardHeader className="m-0 p-0 flex justify-center">
//                     <CardDescription className="m-0 text-sm  px-2 justify-between pr-3  flex items-center ">
//                         <div className="w-14 h-14 flex items-center gap-2  ">
//                             <img src={userImage} alt="" className="bg-contain h-fit" />
//                             <h1 className="">{createdBy.toUpperCase()}</h1>
//                         </div>
//                         <h1>{createdOn}</h1>
//                     </CardDescription>
//                 </CardHeader>

//                 <CardContent className=" mx-6 p-0 mb-2 ">
//                     <div className="h-52 overflow-hidden  flex flex-col  p-1 ">
//                         {/* 1. Description (always clipped to fit) */}


//                         {/* 2. Invisible spacer or button */}
//                         {description.length >= 200 ? (
//                             <div className="flex flex-col"><p>{description.slice(0, 200)}...</p><Button variant="link" className="text-sm self-end">
//                                 Read More
//                             </Button></div>
//                         ) : (
//                             /* even when there's no button, this empty div
//                                takes up the same space so the card height stays identical */
//                             <div className="flex flex-col">{description} <div className="h-14"></div></div>
//                         )}
//                     </div>
//                 </CardContent>
//                 <CardFooter className="flex bg-white   py-2   items-center justify-center border-t-2 border-primary text-center">
//                     <CardTitle className="flex-1 min-h-full pl-14 font-marker ">{title}</CardTitle>
//                     <Button variant="link" className="w-1/6 min-h-full p-0 m-0 flex-end  ">
//                         <ArrowRightCircle className="text-amber-500 m-0 p-0" style={{ width: "2rem", height: "2rem" }} />
//                     </Button>
//                 </CardFooter>
//             </Card>
//         </div>
//     )
// }






