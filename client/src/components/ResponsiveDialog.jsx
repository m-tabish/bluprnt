/* eslint-disable react/prop-types */
import axios from "axios"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
function ResponsiveDialog({ submit, setSubmit }) {

    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false)
    const serverURL = useSelector(state => state.serverURL)
    // console.log(serverURL);

    const submitDetails = async (email) => {
        try {
            if (email) {
                const result = await axios.post(
                    `${serverURL}/newUser`,
                    {
                        email,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )

                if (result.status === 201) { setLoading(false); setSubmit(true); setSubmitted(true); console.log(result) }
            }
        } catch (error) {
            console.error(error)
        }
    }


    async function handleSubmit(e) {
        e.preventDefault(); // Prevent form from reloading the page
        setLoading(true);

        console.log(email);

        if (email && email.includes("@")) {
            setTimeout(async () => { await submitDetails(email) }, 2000)
            setEmail("");

        } else {
            alert("Kindly check the entered details.");
        }
    }



    return (
        <>
            <form className="flex lg:flex-row  flex-col lg:w-2/3 items-center justify-center" onSubmit={((e) => handleSubmit(e))}>

                <Input type="email" id="email" onChange={e => setEmail(e.target.value)} required value={email} className={`${submitted ? "text-center bg-emerald-700 border-green-400 border-4 text-marker text-2xl font-marker" : "bg-primary lg:rounded-r-none  font-jetMono border-white"}  w-full text-white  lg:h-16 lg:w-1/3 drop-shadow-lg shadow-xlborder-2  placeholder:text-white`} placeholder={submitted ? "✔ Success" : `Place your email here!`}  >
                </Input>

                {!submitted && <Button className={`bg-white hover:text-primary text-primary hover:bg-white lg:h-16 lg:m-0 mt-4 font-marker lg:rounded-l-none `} variant={"default"} >{!loading ? "Join the Waitlist" : "Loading"}
                </Button>
                }

            </form>
        </>
    )


}
export default ResponsiveDialog
