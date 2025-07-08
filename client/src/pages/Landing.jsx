/* eslint-disable react/prop-types */
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import ProjectInfo from '@/components/ProjectInfo';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/firebase/authContext';
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { Link } from 'lucide-react';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import "../App.css";
import logo from "../assets/logo.png";
import peerlist_spotlight from "../assets/peerlist.png";
function Landing() {
    const { userLoggedIn } = useAuth();
    const [bluprnt, setBluprnt] = useState([
        {
            createdBy: "tabish",
            description: "Mirai is an application designed to keep users updated on the latest research advancements. It utilizes Python, Hugging Face Transformers, and Streamlit to fetch, process, and present information from research papers and publications.",
            title: "Matrix",
            createdOn: "06/07/25"
        },
        {
            createdBy: "tabish",
            description: "Mirai is an application designed to keep users updated on the latest research advancements. It utilizes Python, Hugging Face Transformers, and Streamlit to fetch, process, and present information from research papers and publications.",
            title: "Matrix",
            createdOn: "06/07/25"
        },
        {
            createdBy: "tabish",
            description: "Mirai is an application designed to keep users updated on the latest research advancements. It utilizes Python, Hugging Face Transformers, and Streamlit to fetch, process, and present information from research papers and publications.",
            title: "Matrix",
            createdOn: "06/07/25"
        },
        {
            createdBy: "alex",
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

    if (userLoggedIn) return <Navigate to="/app" replace />;

    return (
        <div className="bluprnt-background relative w-screen pt-36 font-jetMono text-white ">
            <Navbar />

            {/* Hero Section */}
            <section className='relative w-4/5 mx-auto -top-10 snap-start ic  h-screen flex flex-col justify-center items-center overflow-hidden'>
                {/* Logo - Responsive positioning */}
                <img
                    src={logo}
                    alt="bluprnt logo"
                    className='absolute w-60 sm:w-80 md:w-96 lg:w-[500px] left-4 sm:left-8 md:left-16 lg:left-40 top-16 sm:top-20'
                />

                {/* Nodes - Hidden on mobile for cleaner look */}
                <div className="hidden lg:block">
                    {/* Node 1 */}
                    <div className={`absolute left-24 top-96 w-48 h-24 border rounded-lg flex items-center shadow-[1px_1px_20px_#00ff0020]`}>
                        <div className='w-1/4 border-r h-full  flex flex-col items-center justify-around text-white bg-blue-800 rounded-tl-lg rounded-bl-lg'>
                            <p className='text-xl font-bold '>1</p>
                            <p>{"</>"}</p>
                        </div>
                        <div className='mx-auto font-bold text-3xl text-center bg-white/25 w-full h-full justify-center items-center flex flex-col'>
                            <p className='    tracking-widest '>{users}+</p>
                            <p className='text-xs '>Bluprnts Generated</p>
                        </div>
                    </div>

                    {/* Node 2 */}
                    <div className={`absolute left-96 top-[550px] w-48 h-24 border rounded-lg flex items-center shadow-[1px_1px_20px_#00ff0020]`}>
                        <div className='w-1/4 border-r h-full flex flex-col items-center justify-around text-white bg-blue-800 rounded-tl-lg rounded-bl-lg'>
                            <p className='text-xl font-bold '>1</p>
                            <p>{"</>"}</p>
                        </div>
                        <div className='mx-auto font-bold text-3xl text-center bg-white/25 w-full h-full justify-center items-center flex flex-col'>
                            <p className='  tracking-widest'>{users}+</p>
                            <p className='text-xs '>Builders strong</p>
                        </div>
                    </div>

                    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                        <path
                            d="M 380 600 C 300 600, 380 440, 288 440"
                            stroke="white"
                            strokeWidth="1"
                            fill="none"
                            strokeDasharray={"5,5"}
                        />
                    </svg>
                </div>

                {/* Hero Text and Button - Responsive positioning */}
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:top-56 lg:right-8 xl:right-48 lg:left-auto lg:transform-none flex flex-col justify-center items-center lg:items-start h-auto lg:h-1/2 text-center lg:text-left px-4'>
                    <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-marker text-white/60 mb-8 lg:mb-0 tracking-wider'>
                        Generate <span className='text-primary stroke-white drop-shadow-[0px_2px_0px_rgba(256,256,256,1)]'>Bluprnts</span> for <br /> projects effortlessly
                    </h1>

                    <Button
                        className="text-lg sm:text-xl self-center lg:text-2xl p-3 sm:p-4 w-fit mx-auto lg:mx-0 h-auto font-marker rounded-md shadow-[12px_19px_30px_-13px_rgba(0,_0,_0,_0.3)] border-2 hover:border-white hover:border-2 hover:text-white hover:rounded-[40px] active:border-black backdrop-blur-xs bg-white/20 hover:bg-white/0 border-white/20 mt-4 lg:mt-8"
                        style={{
                            transitionProperty: "border-radius",
                            transitionDuration: "300ms",
                            transitionTimingFunction: "ease-in-out",
                        }}
                        onClick={() => navigate("/app/dashboard")}
                    >
                        Create Bluprnt
                    </Button>
                </div>
            </section>

            {/* Bluprnt Library */}
            <BluprntCarousel className="snap-start" bluprnt={bluprnt} />

            {/* Featured Section */}
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

export default Landing;




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
                    <div key={index} className="keen-slider__slide flex justify-center">
                        <ProjectInfo
                            createdBy={project.createdBy}
                            description={project.description}
                            title={project.title}
                            createdOn={project.createdOn}
                        />
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






