import googleIcon from "@/assets/googleIcon.png"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { doSignInwithEmailandPassword, doSignInWithGoogle } from "@/firebase/auth"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import navlogo from "../assets/navlogo.png"
import { useAuth } from "../firebase/authContext"
export function LoginForm({
  // eslint-disable-next-line react/prop-types
  className,
  ...props
}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { userLoggedIn } = useAuth();

  if (userLoggedIn) {
    return <Navigate to="/app" replace={true} />
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        if (email == null || password == null) {
          setErrorMessage("Email and password are required");
          setIsSigningIn(false);
          return;
        }
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
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <a href="/" className="flex flex-col items-center gap-2 font-medium">
          <div className="flex w-full h-full p-4 items-center justify-center rounded-2xl gap-3 mb-2 bg-white/30 backdrop-blur-4xl shadow-lg border border-white/20">
            <img src={navlogo} alt="navlogo" className="scale-125" />
            <h1 className="font-marker text-white text-2xl flex items-center gap-3">Bluprnt</h1>
          </div>
          <span className="sr-only">Bluprnt.tech</span>
        </a>
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-white">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="johndoe@example.com"
            className="text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password" >Password</Label>
            <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="text-black"

            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && (
            <div className="text-red-500 text-sm text-center">
              {errorMessage}
            </div>
          )}
        </div>
        <Button type="submit"
          className="w-full bg-primary/90 border-2 border-blue-400 text-white font-extrabold hover:text-white hover:bg-primary hover:border-white hover:border-2 "
          disabled={isSigningIn}>
          {isSigningIn ? "Signing in..." : "Login"}
        </Button>
        <div
          className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 rounded-full text-black ">
            Or continue with
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-1">
          <Button
            variant="outline"
            className="w-full text-white bg-white/30 hover:bg-white/40"
            onClick={onGoogleSignIn}
            disabled={isSigningIn}
            type="button"
          >
            {isSigningIn ? "Signing in..." : <div className="flex items-center gap-2 text-white font-semibold "><img className="w-4 h-4 mr-2 bg-white rounded-full p-0.5" src={googleIcon} alt="Google" />Sign in with Google</div>}
          </Button>
        </div>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
}
