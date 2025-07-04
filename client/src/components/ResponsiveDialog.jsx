/* eslint-disable react/prop-types */
import axios from "axios"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

function ResponsiveDialog({ submit, setSubmit }) {

    const [email, setEmail] = useState('');

    const [user, setUser] = useState("");
    const [submitted, setSubmitted] = useState(submit);

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

                if (result) { setSubmit(true); setSubmitted(true); console.log(result) }
            }
        } catch (error) {
            console.error(error)
        }
    }


    async function handleSubmit(e) {
        e.preventDefault(); // Prevent form from reloading the page


        console.log(email);

        if (email && email.includes("@")) {
            await submitDetails(email)
            setUser({ email });
            setEmail("");

        } else {
            alert("Kindly check the entered details.");
        }
    }



    return (<div className="flex lg:flex-row  flex-col lg:w-2/3 items-center justify-center">

        <Input className="w-full  lg:h-16 lg:w-1/3 drop-shadow-lg shadow-xl font-jetMono text-black lg:rounded-r-none bg-primary border-2 border-white placeholder:text-white" placeholder="Place your email here!" onChange={(e) => setEmail(e.target.value)}>
        </Input>

        <Button className=" bg-white/80 hover:text-primary   hover:bg-white h-16 lg:m-0 mt-4 text-primary font-marker lg:rounded-l-none " variant={"default"} onClick={((e) => handleSubmit(e))}>{submitted ? "Welcome to the club" : "Join the Waitlist"}
        </Button>
    </div>)
    // return (
    //     <Drawer className=" border-t-4 border-red flex justify-center items-center">
    //         <DrawerTrigger className=" w-52 min-h-full  lg:w-64 lg:h-20   text-primary font-marker font-bold border-transparent border-2 text-md bg-white hover:bg-primary hover:border-2 hover:border-blue-600 active:border-white active:border-2 hover:text-white transition-all duration-300">
    //             Join the waitlist
    //         </DrawerTrigger>

    //         <DrawerContent className="mx-auto w-[90%] sm:w-[70%] md:w-[50%] lg:w-1/2 p-4 font-bold">
    //             <DrawerHeader>
    //                 <DrawerTitle className="font-bold text-center text-2xl font-marker">Kindly fill this form</DrawerTitle>
    //                 <DrawerDescription className="font-bold text-center text-md font-jetMono text-red-400">
    //                     Note: We might reach out for feedback on beta version.
    //                 </DrawerDescription>

    //                 <form className={cn("grid items-center gap-6 mt-4")} onSubmit={handleSubmit}>
    //                     <div className="grid gap-3">
    //                         <Label htmlFor="name" className="text-md font-bold">Name</Label>
    //                         <Input
    //                             type="text"
    //                             className="border border-black w-full"
    //                             id="username"
    //                             value={username}
    //                             placeholder="John Doe"
    //                             onChange={e => setUsername(e.target.value)}
    //                             required
    //                         />
    //                     </div>

    //                     <div>
    //                         <Label htmlFor="email" className="text-md font-bold">Email</Label>
    //                         <Input
    //                             type="email"
    //                             className="border border-black w-full"
    //                             id="email"
    //                             value={email}
    //                             placeholder="bluprnt@gmail.com"
    //                             onChange={e => setEmail(e.target.value)}
    //                             required
    //                         />
    //                     </div>

    //                     <div>
    //                         <Label htmlFor="twitter" className="text-md font-bold">Twitter Handle (Optional)</Label>
    //                         <Input
    //                             type="text"
    //                             className="border border-black w-full"
    //                             id="twitter"
    //                             value={twitterHandle}
    //                             placeholder="@damnthesebugs"
    //                             onChange={e => setTwitterHandle(e.target.value)}
    //                         />
    //                     </div>

    //                     <DrawerFooter className="flex flex-col gap-2">
    //                         <Button type="submit" className="w-full border border-white ">Submit</Button>
    //                         <DrawerClose asChild>
    //                             <Button variant="outline" className="w-full text-black">Cancel</Button>
    //                         </DrawerClose>
    //                     </DrawerFooter>
    //                 </form>


    //             </DrawerHeader>
    //         </DrawerContent>


    //     </Drawer>
    // )
}



export default ResponsiveDialog
