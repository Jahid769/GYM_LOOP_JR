// pages/404.js

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Frown } from "lucide-react";

export default function Custom404() {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center max-w-md mx-auto py-12 px-8 bg-white rounded-2xl shadow-xl border border-slate-200/50"
                >
                    <Frown className="h-20 w-20 text-teal-400 mx-auto mb-6" />

                    <h1 className="text-6xl sm:text-7xl font-extrabold text-slate-900 mb-4">404</h1>

                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6">
                        Page Not Found
                    </h2>

                    <p className="text-slate-600 text-lg leading-relaxed mb-8">
                        Oops! The page you're looking for doesn't exist or has been moved.
                    </p>

                    <Link href="/" passHref>
                        <Button
                            size="lg"
                            className="bg-teal-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-teal-600 transition-all duration-300 transform hover:scale-105"
                        >
                            Go Back Home
                        </Button>
                    </Link>
                </motion.div>
            </main>
        </div>
    );
}
