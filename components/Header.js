import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dumbbell, Menu, X, User, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
    { name: "Home", href: "/" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export default function Header() {
    const { data: session } = useSession();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { scrollY } = useScroll();
    useMotionValueEvent(scrollY, "change", (latest) => {
        if (mounted) {
            setScrolled(latest > 50);
        }
    });

    const handleNavClick = () => {
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isHomePage = mounted ? router.pathname === "/" : false;
    const shouldShowScrolledState = mounted ? !isHomePage || scrolled : false;

    return (
        <motion.header
            initial={{ y: -120 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-50 p-4"
        >
            <motion.nav
                className={cn(
                    "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 rounded-2xl shadow-lg transition-all duration-300",
                    mounted && shouldShowScrolledState
                        ? "bg-white backdrop-blur-xl"
                        : "bg-transparent"
                )}
            >
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3 group">
                        <Image
                            src={shouldShowScrolledState ? "/logoBlack.png" : "/logoWhite.png"}
                            alt="GymLoop Logo"
                            width={150}
                            height={40}
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-2">
                        {navigation.map((item) => {
                            const isActive = mounted && router.pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "relative px-4 py-2 text-base font-medium transition-colors duration-300 rounded-lg",
                                        mounted && shouldShowScrolledState
                                            ? "text-slate-700 hover:text-teal-600"
                                            : "text-white hover:text-teal-200"
                                    )}
                                >
                                    {item.name}
                                    {isActive && (
                                        <motion.span
                                            layoutId="underline"
                                            className={cn(
                                                "absolute left-1 right-1 -bottom-0.5 h-1 rounded",
                                                mounted && shouldShowScrolledState
                                                    ? "bg-teal-500"
                                                    : "bg-teal-400"
                                            )}
                                            initial={false}
                                            transition={{
                                                type: "spring",
                                                stiffness: 350,
                                                damping: 30,
                                            }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden lg:flex items-center space-x-3">
                        {session ? (
                            <Link href="/dashboard">
                                <Button
                                    variant="ghost"
                                    className={cn(
                                        "transition-colors",
                                        mounted && shouldShowScrolledState
                                            ? "text-slate-700 hover:text-teal-600 hover:bg-teal-50/50"
                                            : "text-white hover:bg-white/10"
                                    )}
                                >
                                    <User className="h-4 w-4 mr-2" />
                                    Dashboard
                                </Button>
                            </Link>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button
                                        variant="ghost"
                                        className={cn(
                                            "transition-colors cursor-pointer",
                                            mounted && shouldShowScrolledState
                                                ? "text-slate-700 hover:text-teal-600 hover:bg-teal-50/50"
                                                : "text-white hover:bg-white/10 hover:text-white"
                                        )}
                                    >
                                        Sign In
                                    </Button>
                                </Link>
                                <Link href="/signup">
                                    <Button
                                        className={cn(
                                            "font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer",
                                            mounted && shouldShowScrolledState
                                                ? "bg-teal-500 text-white hover:bg-teal-600"
                                                : "bg-white text-teal-600 hover:bg-slate-100"
                                        )}
                                    >
                                        Get Started
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={cn(
                            "lg:hidden p-2 rounded-md transition-colors duration-300",
                            mounted && shouldShowScrolledState
                                ? "text-slate-700 hover:text-teal-600"
                                : "text-white hover:text-teal-200"
                        )}
                        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMobileMenuOpen}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isMobileMenuOpen ? "close" : "menu"}
                                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.2 }}
                            >
                                {isMobileMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </motion.button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="lg:hidden mt-2"
                    >
                        <div
                            className={cn(
                                "px-2 pt-2 pb-3 space-y-1 rounded-2xl shadow-lg border",
                                mounted && shouldShowScrolledState
                                    ? "bg-white/90 backdrop-blur-xl border-white/20"
                                    : "bg-black/50 backdrop-blur-xl border-white/20"
                            )}
                        >
                            {navigation.map((item) => {
                                const isActive = mounted && router.pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={handleNavClick}
                                        className={cn(
                                            "block px-3 py-3 rounded-md text-base font-medium transition-colors duration-300 cursor-pointer",
                                            isActive
                                                ? mounted && shouldShowScrolledState
                                                    ? "bg-teal-100/70 text-teal-700"
                                                    : "bg-teal-400/30 text-white"
                                                : mounted && shouldShowScrolledState
                                                  ? "text-slate-700 hover:bg-slate-100/70 hover:text-teal-600"
                                                  : "text-slate-200 hover:bg-white/10 hover:text-white"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}
                            <div
                                className={cn(
                                    "pt-4 mt-4 border-t",
                                    mounted && shouldShowScrolledState
                                        ? "border-slate-200/50"
                                        : "border-slate-500/50"
                                )}
                            >
                                {session ? (
                                    <Link href="/dashboard" onClick={handleNavClick}>
                                        <Button
                                            variant="ghost"
                                            className={cn(
                                                "w-full justify-start text-base font-medium cursor-pointer",
                                                mounted && shouldShowScrolledState
                                                    ? "text-slate-700"
                                                    : "text-slate-200 hover:bg-white/10 hover:text-white"
                                            )}
                                        >
                                            <User className="h-5 w-5 mr-3" /> Dashboard
                                        </Button>
                                    </Link>
                                ) : (
                                    <div className="space-y-3">
                                        <Link href="/login" onClick={handleNavClick}>
                                            <Button
                                                variant="ghost"
                                                className={cn(
                                                    "w-full justify-start text-base font-medium",
                                                    mounted && shouldShowScrolledState
                                                        ? "text-slate-700"
                                                        : "text-slate-200 hover:bg-white/10 hover:text-white"
                                                )}
                                            >
                                                <User className="h-5 w-5 mr-3" /> Sign In
                                            </Button>
                                        </Link>
                                        <Link href="/signup" onClick={handleNavClick}>
                                            <Button
                                                className={cn(
                                                    "w-full font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-300",
                                                    mounted && shouldShowScrolledState
                                                        ? "bg-teal-500 text-white hover:bg-teal-600"
                                                        : "bg-white text-teal-600 hover:bg-slate-100"
                                                )}
                                            >
                                                Get Started
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
