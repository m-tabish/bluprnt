/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { doSignInwithEmailandPassword, doSignInWithGoogle } from "@/firebase/auth"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Navigate } from "react-router-dom"
import "../App.css"
import navlogo from "../assets/navlogo.png"
import { useAuth } from "../firebase/authContext/index"
export function LoginForm({
  className,
  ...props
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { userLoggedIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInwithEmailandPassword(email, password);
      } catch (error) {
        setErrorMessage(error.message);
        setIsSigningIn(false);
      }
    }
  }

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        const result = await doSignInWithGoogle();
        console.log("Signin successfull", result.user);
      } catch (error) {
        setErrorMessage(error.message);
        console.log("Signin failed", error.message);
        setIsSigningIn(false);
      }
    }
  }

  if (!userLoggedIn) {
    <Navigate to={"/signup"} replace={true} />
  }


  return (
    <div className={cn("bluprnt-background text-white font-jetMono w-screen h-screen flex flex-col gap-6 justify-center items-center  ", className)} {...props}>
      {userLoggedIn && (<Navigate to={"/app/dashboard"} replace={true} />)}

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a href="/" className="flex flex-col items-center gap-2 font-medium">
              <div className="flex w-full h-full p-4 items-center justify-center rounded-2xl gap-3 mb-2 bg-white/30 backdrop-blur-4xl shadow-lg border border-white/20">
                <img src={navlogo} alt="navlogo" className="scale-125" />
                <h1 className="font-marker text-white text-2xl flex items-center gap-3">Bluprnt</h1>
              </div>
              <span className="sr-only">Bluprnt.tech</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to Bluprnt</h1>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="underline underline-offset-4 font-bold">
                Sign up
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="grid gap-2 ">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                className="text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="text-black"

                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {errorMessage && (
              <div className="text-red-500 text-sm text-center">
                {errorMessage}
              </div>
            )}

            <Button type="submit" className="w-full bg-primary/90 border-2 border-blue-400 text-white font-extrabold hover:text-white hover:bg-primary hover:border-white hover:border-2 " disabled={isSigningIn}>
              {isSigningIn ? "Signing in..." : "Login"}
            </Button>
          </div>

          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 font-bold text-primary bg-background rounded-lg px-2 align-middle">
              Or
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-1">
            <Button
              variant="outline"
              className="w-full text-white bg-[#ea4236]"
              onClick={onGoogleSignIn}
              disabled={isSigningIn}
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 mr-2">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor" />
              </svg>
              {isSigningIn ? "Signing in..." : "Continue with Google"}
            </Button>
          </div>
        </div>
      </form>

      <div className="text-balance text-center p-1 text-xs text-white text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>
        and <a href="#">Privacy Policy</a>.
      </div>

      <div className="text-center"><b>Test</b>
        <p>mohdtabishkhan001@gmail.com</p>
        <p>123456</p>
      </div>
    </div>
  );
}