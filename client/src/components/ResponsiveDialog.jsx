/* eslint-disable react/prop-types */
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer"
import { cn } from "@/lib/utils"
import axios from "axios"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

function ResponsiveDialog() {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('')
    const [twitterHandle, setTwitterHandle] = useState('')
    const [user, setUser] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const serverURL = useSelector(state => state.serverURL)
    // console.log(serverURL);

    const submitDetails = async (user) => {
        try {
            if (user) {
                const result = await axios.post(
                    `${serverURL}/newUser`,
                    {
                        username: user.username,
                        email: user.email,
                        twitterHandle: user.twitterHandle
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )

                if (result) { setSubmitted(true); console.log(result) }
            }
        } catch (error) {
            console.error(error)
        }
    }


    async function handleSubmit(e) {
        e.preventDefault(); // Prevent form from reloading the page
        const inputUser = { email, username, twitterHandle };

        if (inputUser.email && inputUser.username) {
            await submitDetails(inputUser)
            setUser({ ...inputUser });
            setEmail("");
            setTwitterHandle("");
            setUsername("");
            // console.log(`User Registered!\nName: ${inputUser.username}\nEmail: ${inputUser.email}\nTwitter: ${inputUser.twitterHandle || 'N/A'}`);
        } else {
            alert("Kindly check the entered details.");
        }
    }



    if (submitted) {
        return (
            <h1 className="text-center text-2xl lg:text-2xl font-bold inline-block text-transparent bg-clip-text bg-gradient-to-r from-orange-200 via-orange-500 to-orange-500">
                Thanks for joining us! We can&apos;t wait to share something special with you.
            </h1>)
    }


    return (
        <Drawer className= "flex justify-center items-center">
            <DrawerTrigger className=" w-52 min-h-full  lg:w-64 lg:h-20   text-primary font-marker font-bold border-transparent border-2 text-md bg-white hover:bg-primary hover:border-2 hover:border-blue-600 active:border-white active:border-2 hover:text-white transition-all duration-300">
                Join the waitlist
            </DrawerTrigger>

            <DrawerContent className="mx-auto w-[90%] sm:w-[70%] md:w-[50%] lg:w-1/2 p-4 font-bold">
                <DrawerHeader>
                    <DrawerTitle className="font-bold text-center text-2xl font-marker">Kindly enter your email.</DrawerTitle>
                    <DrawerDescription className="font-bold text-center text-md font-jetMono text-red-400">
                        Note: We might reach out for feedback on beta version.
                    </DrawerDescription>

                    <form className={cn("grid items-center gap-6 mt-4")} onSubmit={handleSubmit}>
                        <div className="grid gap-3">
                            <Label htmlFor="name" className="text-md font-bold">Name</Label>
                            <Input
                                type="text"
                                className="border border-black w-full"
                                id="username"
                                value={username}
                                placeholder="John Doe"
                                onChange={e => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="email" className="text-md font-bold">Email</Label>
                            <Input
                                type="email"
                                className="border border-black w-full"
                                id="email"
                                value={email}
                                placeholder="bluprnt@gmail.com"
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="twitter" className="text-md font-bold">Twitter Handle (Optional)</Label>
                            <Input
                                type="text"
                                className="border border-black w-full"
                                id="twitter"
                                value={twitterHandle}
                                placeholder="@damnthesebugs"
                                onChange={e => setTwitterHandle(e.target.value)}
                            />
                        </div>

                        <DrawerFooter className="flex flex-col gap-2">
                            <Button type="submit" className="w-full border border-white ">Submit</Button>
                            <DrawerClose asChild>
                                <Button variant="outline" className="w-full text-black">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </form>


                </DrawerHeader>
            </DrawerContent>


        </Drawer>
    )
}



export default ResponsiveDialog
