import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { doSignOut } from "@/firebase/auth";
import { useAuth } from "@/firebase/authContext";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import navlogo from "../assets/navlogo.png";
import { Button } from "./ui/button";

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const options = [
        { label: "Home", href: "/" },
        { label: "Explore", href: "/app/explore" },
        { label: "Library", href: "/app/library" },
        { label: "Settings", href: "/app/settings" }
    ];

    const { userLoggedIn } = useAuth();
    const navigate = useNavigate();

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleMobileNavigation = (href) => {
        navigate(href);
        setIsMobileMenuOpen(false);
    };

    return (
        <div className={`fixed top-2 left-1/2 -translate-x-1/2 w-4/5 ${isMobileMenuOpen ? 'rounded-none' : 'rounded-full'} backdrop-blur-md bg-white/10  border-b border-white/10 shadow-[0px_2px_20px_rgba(256,256,256,0.1)]`}>
            <div className="px-4 sm:px-6 lg:px-8 w-full  ">
                <div className="flex items-center justify-between h-16">
                    {/* Logo Section */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <img src={navlogo} alt="navlogo" className="w-full" />
                        <h1 className="font-marker text-white text-xl sm:text-2xl">Bluprnt</h1>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <NavigationMenu>
                            <NavigationMenuList>
                                {options.map(option => (
                                    <NavigationMenuItem key={option.href}>
                                        <NavigationMenuTrigger className="text-md font-jetMono bg-transparent text-white hover:text-white/80 data-[active]:bg-white/10 data-[state=open]:bg-white/10">
                                            {option.label}
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <NavigationMenuLink
                                                href={option.href}
                                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                            >
                                                {option.label}
                                            </NavigationMenuLink>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex gap-3">
                        {!userLoggedIn ? (
                            <>
                                <Button
                                    className="bg-white text-primary font-bold hover:bg-white/90"
                                    onClick={() => navigate("/login")}
                                >
                                    Login
                                </Button>
                                <Button
                                    onClick={() => navigate("/signup")}
                                    className="bg-primary text-white hover:bg-primary/90"
                                >
                                    Get Started
                                </Button>
                            </>
                        ) : (
                            <Button
                                className="bg-white text-primary font-bold hover:bg-white/90"
                                onClick={() => doSignOut()}
                            >
                                Logout
                            </Button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <Button
                            variant="default"
                            size="icon"
                            onClick={handleMobileMenuToggle}
                            className="text-white"
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6  " />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white/10 backdrop-blur-md border-t border-white/20">
                    <div className="px-4 py-2 space-y-1">
                        {/* Mobile Navigation Links */}
                        {options.map(option => (
                            <button
                                key={option.href}
                                onClick={() => handleMobileNavigation(option.href)}
                                className="block w-full text-left px-3 py-2 text-white font-jetMono hover:bg-white/10 rounded-md transition-colors"
                            >
                                {option.label}
                            </button>
                        ))}

                        {/* Mobile Auth Buttons */}
                        <div className="pt-4 pb-2 space-y-2">
                            {!userLoggedIn ? (
                                <>
                                    <Button
                                        className="w-full bg-white text-primary font-bold hover:bg-white/90"
                                        onClick={() => {
                                            navigate("/login");
                                            setIsMobileMenuOpen(false);
                                        }}
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        className="w-full bg-primary text-white hover:bg-primary/90"
                                        onClick={() => {
                                            navigate("/signup");
                                            setIsMobileMenuOpen(false);
                                        }}
                                    >
                                        Get Started
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    className="w-full bg-white text-primary font-bold hover:bg-white/90"
                                    onClick={() => {
                                        doSignOut();
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    Logout
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar;