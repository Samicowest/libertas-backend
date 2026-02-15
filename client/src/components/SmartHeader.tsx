import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { Menu, X } from "lucide-react";

interface SmartHeaderProps {
    showAuthButtons?: boolean;
    children?: React.ReactNode;
    showDefaultNav?: boolean;
}

export default function SmartHeader({
    showAuthButtons = true,
    children,
    showDefaultNav = true
}: SmartHeaderProps) {
    const { isAuthenticated, logout } = useAuth();
    const loginUrl = getLoginUrl();
    const { scrollDirection, isScrolling } = useScrollDirection();
    const [isVisible, setIsVisible] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY < 50) {
                setIsVisible(true);
            } else if (!isScrolling || scrollDirection === "up") {
                setIsVisible(true);
            } else if (scrollDirection === "down") {
                setIsVisible(false);
            }
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [scrollDirection, isScrolling]);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const navLinks = (
        <>
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-center text-white/80 hover:text-white transition-colors font-medium">
                Home
            </Link>
            <Link href="/whitepaper" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-center text-white/80 hover:text-white transition-colors font-medium">
                Whitepaper
            </Link>
            <Link href="/projects" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-center text-white/80 hover:text-white transition-colors font-medium">
                Projects
            </Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-center text-white/80 hover:text-white transition-colors font-medium">
                About Us
            </Link>
        </>
    );

    const authButtons = (
        <div className="flex flex-col md:flex-row items-center gap-3">
            {isAuthenticated ? (
                <>
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                        <Button className="relative bg-[#0A0628] text-white/90 border border-white/10 shadow-2xl px-6 cursor-pointer hover:bg-[#1a0f3d]">
                            Dashboard
                        </Button>
                    </div>

                    <Button
                        variant="ghost"
                        onClick={() => {
                            logout();
                            setIsMobileMenuOpen(false);
                        }}
                        className="text-white/70 hover:text-white hover:bg-white/10"
                    >
                        Logout
                    </Button>
                </>
            ) : (
                <>
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">
                            Log In
                        </Button>
                    </Link>

                    <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg shadow-purple-500/50">
                            Get Started
                        </Button>
                    </Link>
                </>
            )}
        </div>
    );

    return (
        <motion.header
            initial={{ y: 0 }}
            animate={{ y: isVisible ? 0 : -100 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-md bg-[#0A0628]/80"
        >
            <nav className="container mx-auto px-4 h-20 flex items-center justify-between relative">
                {/* Logo */}
                <div className="flex-shrink-0 z-10">
                    <Link href="/" className="flex items-center gap-3 group">
                        <img src="/libertas-logo-white.png" alt="Libertas Alpha" className="h-10 w-auto transition-transform group-hover:scale-105" />
                    </Link>
                </div>

                {/* Centered Nav Links for desktop */}
                {showDefaultNav && (
                    <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                        <Link href="/" className="text-white/80 hover:text-white transition-colors font-medium">Home</Link>
                        <Link href="/whitepaper" className="text-white/80 hover:text-white transition-colors font-medium">Whitepaper</Link>
                        <Link href="/projects" className="text-white/80 hover:text-white transition-colors font-medium">Projects</Link>
                        <Link href="/about" className="text-white/80 hover:text-white transition-colors font-medium">About Us</Link>
                    </div>
                )}

                {/* Right side content */}
                <div className="flex items-center gap-4 z-10">
                    {children}

                    {/* Auth buttons for desktop */}
                    {showAuthButtons && (
                        <div className="hidden md:flex">
                            {authButtons}
                        </div>
                    )}

                    {/* Hamburger Menu for Mobile */}
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-white hover:bg-white/10 p-2"
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && showDefaultNav && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden absolute top-full left-0 w-full bg-[#0A0628]/95 backdrop-blur-lg border-t border-white/10"
                    >
                        <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
                            {navLinks}

                            {/* Auth buttons for mobile */}
                            {showAuthButtons && (
                                <div className="pt-6 border-t border-white/20 mt-4">
                                    {authButtons}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
