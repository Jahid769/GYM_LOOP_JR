import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";

const PLANS = [
    {
        name: "1 Month",
        tagline: "15 visits (15 credits)",
        price: 2999,
        features: ["Valid for 1 month", "15 visits to any gym", "Access to all partner gyms"],
        isPopular: false,
    },
    {
        name: "2 Month",
        tagline: "32 visits (32 credits)",
        price: 5999,
        features: ["Valid for 2 months", "32 visits to any gym", "Access to all partner gyms"],
        isPopular: true,
    },
    {
        name: "3 Month",
        tagline: "50 visits (50 credits)",
        price: 7999,
        features: ["Valid for 3 months", "50 visits to any gym", "Access to all partner gyms"],
        isPopular: false,
    },
];

const PricingCard = ({ plan }) => {
    return (
        <div
            className={cn(
                "relative flex flex-col p-8 bg-white rounded-2xl shadow-md border border-slate-200/50",
                plan.isPopular && "border-2 border-teal-500"
            )}
        >
            {plan.isPopular && (
                <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
                    <span className="bg-teal-500 text-white text-xs font-semibold px-4 py-1 rounded-full uppercase">
                        Most Popular
                    </span>
                </div>
            )}
            <h3 className="text-xl font-semibold text-slate-900">{plan.name}</h3>
            <p className="mt-2 text-sm text-slate-600 flex-grow">{plan.tagline}</p>
            <div className="mt-6">
                <span className="text-4xl font-bold text-slate-900">
                    ৳{plan.price.toLocaleString()}
                </span>
                <span className="text-base font-medium text-slate-500 ml-1">/package</span>
            </div>
            <ul className="mt-6 space-y-4">
                {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                        <Check className="h-5 w-5 text-teal-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-slate-700">{feature}</span>
                    </li>
                ))}
            </ul>
            <div className="mt-8">
                <Link href="/signup" className="w-full">
                    <Button
                        size="lg"
                        className={cn(
                            "w-full font-semibold cursor-pointer",
                            plan.isPopular
                                ? "bg-teal-500 text-white hover:bg-teal-600"
                                : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                        )}
                    >
                        Choose Plan
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default function PricingPage() {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Head>
                <title>Pricing | GymLoop</title>
                <meta
                    name="description"
                    content="Flexible and affordable pricing plans to access gyms across Bangladesh with GymLoop."
                />
            </Head>
            <Header />

            <main className="flex-grow py-16 sm:py-20 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                    {/* Page Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">
                            Flexible Packages for Everyone
                        </h1>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                            Choose the package that fits your lifestyle. Get access to our entire
                            network of gyms with one simple purchase.
                        </p>
                    </motion.div>

                    {/* Pricing Grid */}
                    <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8 items-start">
                        {PLANS.map((plan, index) => (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                                className={cn("h-full", plan.isPopular && "transform lg:scale-105")}
                            >
                                <PricingCard plan={plan} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
