/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Avatar } from "@/components/ui/avatar"

import { TwitterLogoIcon } from "@radix-ui/react-icons"
import { Github, Linkedin, UserRound } from "lucide-react"
function Socials({ className }) {
    const avatarClass = "flex justify-center items-center rounded-full"
    return (
        <div className={`${className} z-10 sm:w-fit w-[2em] place-items-start text-black `}>
            <Avatar className={`${avatarClass}`}>
                <a href="https://www.x.com/rmdir_sys32" target="_blank"><TwitterLogoIcon  /></a>
            </Avatar>
            <Avatar className={`${avatarClass}`}>
                <a href="https://www.linkedin.com/in/m-tabishk/" target="_blank"><Linkedin /></a>
            </Avatar>
            <Avatar className={`${avatarClass}`}>
                <a href="https://github.com/m-tabish/bluprnt" target="_blank"><Github /></a>

            </Avatar>
            <Avatar className={`${avatarClass}`}>
                <a href="https://www.tabishcodes.me/" target="_blank"><UserRound /></a>

            </Avatar>
        </div >
    )
}

export default Socials
