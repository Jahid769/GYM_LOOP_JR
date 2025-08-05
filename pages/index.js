import { useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    Dumbbell,
    Users,
    Clock,
    MapPin,
    Wallet,
    Calendar,
    Play,
    Quote,
    ChevronRight,
    Star,
} from "lucide-react";

// Constants extracted to reduce re-renders
const HOW_IT_WORKS = [
    {
        step: "01",
        title: "Choose Your Plan",
        description:
            "Pick a monthly plan that fits your lifestyle and fitness goals. No hidden fees.",
        icon: Calendar,
    },
    {
        step: "02",
        title: "Find Your Gym",
        description: "Explore our vast network of premium partner gyms right from the app.",
        icon: MapPin,
    },
    {
        step: "03",
        title: "Scan & Train",
        description:
            "A simple QR code scan at the front desk is all it takes to start your workout.",
        icon: Dumbbell,
    },
];

const FEATURES = [
    {
        icon: Dumbbell,
        title: "Multi-Gym Access",
        description:
            "Train at any partner gym with a single subscription. No more location restrictions.",
    },
    {
        icon: Wallet,
        title: "Flexible Plans",
        description: "Choose from various monthly plans starting at ৳800. Cancel or pause anytime.",
    },
    {
        icon: Clock,
        title: "No Long-Term Contracts",
        description: "Freedom to train on your terms. No long-term commitments or hidden fees.",
    },
    {
        icon: Users,
        title: "Nationwide Network",
        description: "Access premium gyms across Bangladesh. Train anywhere, anytime.",
    },
];

const TESTIMONIALS = [
    {
        name: "Rahul Ahmed",
        role: "Software Engineer",
        content:
            "Gym Loop has revolutionized my fitness routine. I can work out near my office or home without being tied to one location. The app is seamless and the gym network is impressive.",
        rating: 5,
        avatar: "RA",
    },
    {
        name: "Fatima Khan",
        role: "Medical Student",
        content:
            "As a student who moves between cities, this is perfect. I don't waste money on unused memberships anymore. The flexibility is exactly what I needed for my busy schedule.",
        rating: 5,
        avatar: "FK",
    },
    {
        name: "Mohammed Ali",
        role: "Business Owner",
        content:
            "The flexibility is unmatched. I can train anywhere in the city, and the app makes check-ins super easy. It's like having a personal fitness concierge in my pocket.",
        rating: 5,
        avatar: "MA",
    },
];

const FAQ_DATA = [
    {
        question: "How does the single subscription for multiple gyms work?",
        answer: "Your Gym Loop subscription gives you a digital pass. Simply open our app, choose any of our 50+ partner gyms, and scan the QR code at the reception to check in. You can visit different gyms as often as you like, all under one monthly plan.",
    },
    {
        question: "What if I want to cancel or pause my membership?",
        answer: "We believe in flexibility. You can pause or cancel your subscription at any time directly from your account dashboard in the app. There are no cancellation fees or long-term commitments. Your membership will remain active until the end of your current billing cycle.",
    },
    {
        question: "Are there any hidden fees I should be aware of?",
        answer: "Absolutely not. The price of your chosen plan is all you pay. There are no sign-up fees, cancellation fees, or other hidden charges. We pride ourselves on transparent pricing.",
    },
    {
        question: "How quickly can I start working out after I sign up?",
        answer: "Instantly! As soon as you complete the sign-up process and choose your plan, your digital pass is activated. You can head to your nearest partner gym and start your workout immediately.",
    },
];

// Animation variants - defined once and reused
const ANIMATION_VARIANTS = {
    container: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    },
    fadeIn: {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeInOut" },
        },
    },
    chevronRotate: {
        closed: { rotate: 0 },
        open: { rotate: 90 },
    },
    accordion: {
        closed: { opacity: 0, height: 0 },
        open: {
            opacity: 1,
            height: "auto",
            transition: { duration: 0.3, ease: "easeInOut" },
        },
    },
};

// Optimized reusable components
const Accent = memo(({ children }) => <span className="text-teal-500">{children}</span>);

const Section = memo(({ children, className = "" }) => (
    <section className={`py-20 sm:py-28 lg:py-32 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
));

const StaggeredFadeIn = memo(({ children, ...props }) => (
    <motion.div
        variants={ANIMATION_VARIANTS.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        {...props}
    >
        {children}
    </motion.div>
));

const FadeIn = memo(({ children, ...props }) => (
    <motion.div variants={ANIMATION_VARIANTS.fadeIn} {...props}>
        {children}
    </motion.div>
));

// Optimized FAQ component with useCallback
const FaqItem = memo(({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    return (
        <FadeIn>
            <div className="border-b border-slate-200">
                <button
                    onClick={toggle}
                    className="w-full flex justify-between items-center py-5 text-left"
                    aria-expanded={isOpen}
                >
                    <h3 className="text-lg font-medium text-slate-800">{item.question}</h3>
                    <motion.div
                        variants={ANIMATION_VARIANTS.chevronRotate}
                        animate={isOpen ? "open" : "closed"}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronRight className="h-5 w-5 text-teal-500" />
                    </motion.div>
                </button>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            variants={ANIMATION_VARIANTS.accordion}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="overflow-hidden"
                        >
                            <p className="pb-5 text-slate-600 leading-relaxed">{item.answer}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </FadeIn>
    );
});

// Optimized feature component
const FeatureCard = memo(({ feature }) => {
    const IconComponent = feature.icon;
    return (
        <FadeIn>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border-t-4 border-teal-500 h-full">
                <div className="mb-4">
                    <IconComponent className="h-8 w-8 text-teal-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
            </div>
        </FadeIn>
    );
});

// Optimized testimonial component
const TestimonialCard = memo(({ testimonial }) => (
    <FadeIn className="h-full">
        <div className="bg-slate-50 p-8 rounded-xl h-full flex flex-col">
            <Quote className="h-8 w-8 text-teal-300 mb-4" />
            <p className="text-slate-700 leading-relaxed flex-grow mb-6">"{testimonial.content}"</p>
            <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.avatar}
                </div>
                <div className="ml-4">
                    <h4 className="font-semibold text-slate-900">{testimonial.name}</h4>
                    <p className="text-slate-500 text-sm">{testimonial.role}</p>
                </div>
            </div>
        </div>
    </FadeIn>
));

// Optimized how it works item
const HowItWorksItem = memo(({ item, index }) => {
    const IconComponent = item.icon;
    return (
        <FadeIn className="relative flex flex-col items-center text-center">
            <div
                className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full h-px bg-teal-300 hidden md:block"
                style={{ zIndex: 0, display: index === 0 ? "none" : "block" }}
            />
            <div className="relative z-10 flex items-center justify-center h-20 w-20 rounded-full bg-white border-2 border-slate-200 shadow-md mb-6">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-teal-500 text-white">
                    <IconComponent className="h-8 w-8" />
                </div>
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">{item.title}</h3>
            <p className="text-slate-600 leading-relaxed">{item.description}</p>
        </FadeIn>
    );
});

// Main component
export default function Home() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 antialiased">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/hero-gym.jpg"
                        alt="Modern gym interior"
                        layout="fill"
                        objectFit="cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
                </div>

                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-20 sm:pt-0">
                    <div className="max-w-4xl mx-auto animate-fade-in">
                        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6">
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                            <span className="text-xs sm:text-sm font-medium">
                                Trusted by 10,000+ Members
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
                            Your Fitness,
                            <span className="text-primary block">
                                <Accent>Unlimited Access</Accent>
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
                            Access premium gyms across Bangladesh with one flexible membership.
                            Train anywhere, anytime with our revolutionary credit-based system.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12">
                            <Link
                                href="/pricing"
                                className="w-full sm:w-auto bg-white text-teal-600 font-semibold py-3 px-8 sm:px-10 rounded-full shadow-lg hover:bg-slate-100 transition-all duration-300 transform hover:scale-105 cursor-pointer text-center"
                            >
                                Start Now
                            </Link>
                            <Button
                                variant="hero-outline"
                                size="lg"
                                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold cursor-pointer"
                            >
                                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                Watch Demo
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-2xl mx-auto">
                            <div className="text-center animate-slide-up">
                                <div className="flex items-center justify-center mb-2">
                                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary mr-2" />
                                    <span className="text-2xl sm:text-3xl font-bold">50+</span>
                                </div>
                                <p className="text-sm sm:text-base text-gray-400">Partner Gyms</p>
                            </div>
                            <div
                                className="text-center animate-slide-up"
                                style={{ animationDelay: "0.2s" }}
                            >
                                <div className="flex items-center justify-center mb-2">
                                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-secondary mr-2" />
                                    <span className="text-2xl sm:text-3xl font-bold">10K+</span>
                                </div>
                                <p className="text-sm sm:text-base text-gray-400">Active Members</p>
                            </div>
                            <div
                                className="text-center animate-slide-up"
                                style={{ animationDelay: "0.4s" }}
                            >
                                <div className="flex items-center justify-center mb-2">
                                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 mr-2" />
                                    <span className="text-2xl sm:text-3xl font-bold">4.9</span>
                                </div>
                                <p className="text-sm sm:text-base text-gray-400">User Rating</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 bg-primary/20 rounded-full blur-xl animate-float" />
                <div
                    className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-16 h-16 sm:w-32 sm:h-32 bg-secondary/20 rounded-full blur-xl animate-float"
                    style={{ animationDelay: "2s" }}
                />
            </section>

            {/* How It Works Section */}
            <Section className="bg-white">
                <StaggeredFadeIn>
                    <div className="text-center">
                        <FadeIn>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                                Get Started in <Accent>3 Easy Steps</Accent>
                            </h2>
                            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-16 lg:mb-20">
                                We've designed a seamless experience so you can focus on what
                                matters most—your workout.
                            </p>
                        </FadeIn>
                    </div>
                    <div className="relative grid md:grid-cols-3 gap-8 md:gap-4">
                        <div
                            className="absolute top-1/2 left-0 w-full h-px bg-slate-200 hidden md:block"
                            style={{ transform: "translateY(-50%)" }}
                        />
                        {HOW_IT_WORKS.map((item, index) => (
                            <HowItWorksItem key={index} item={item} index={index} />
                        ))}
                    </div>
                </StaggeredFadeIn>
            </Section>

            {/* Features Section */}
            <Section>
                <StaggeredFadeIn>
                    <div className="text-center mb-16 lg:mb-20">
                        <FadeIn>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                                The <Accent>Ultimate</Accent> Fitness Pass
                            </h2>
                            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                                We've removed the barriers to fitness. Enjoy unparalleled freedom,
                                flexibility, and value.
                            </p>
                        </FadeIn>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {FEATURES.map((feature, index) => (
                            <FeatureCard key={index} feature={feature} />
                        ))}
                    </div>
                </StaggeredFadeIn>
            </Section>

            {/* Testimonials Section */}
            <Section className="bg-white">
                <StaggeredFadeIn>
                    <div className="text-center mb-16 lg:mb-20">
                        <FadeIn>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                                Loved by <Accent>Members</Accent> Everywhere
                            </h2>
                            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                                Hear from real users who have transformed their fitness journey with
                                Gym Loop.
                            </p>
                        </FadeIn>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {TESTIMONIALS.map((testimonial, index) => (
                            <TestimonialCard key={index} testimonial={testimonial} />
                        ))}
                    </div>
                </StaggeredFadeIn>
            </Section>

            {/* CTA Section */}
            <Section className="bg-teal-500 text-white">
                <StaggeredFadeIn>
                    <div className="text-center max-w-4xl mx-auto">
                        <FadeIn>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                                Ready to Transform Your Fitness?
                            </h2>
                        </FadeIn>
                        <FadeIn>
                            <p className="text-lg text-teal-100 max-w-2xl mx-auto mb-10">
                                Join thousands of members enjoying flexible gym access across
                                Bangladesh. Start your transformation today with our risk-free 7-day
                                trial.
                            </p>
                        </FadeIn>
                        <FadeIn>
                            <Link href="/pricing">
                                <Button
                                    size="lg"
                                    className="bg-white text-teal-600 font-semibold py-3 px-10 rounded-full shadow-lg hover:bg-slate-100 transition-all duration-300 transform hover:scale-105"
                                >
                                    Start Now
                                </Button>
                            </Link>
                        </FadeIn>
                    </div>
                </StaggeredFadeIn>
            </Section>

            {/* FAQ Section */}
            <Section>
                <StaggeredFadeIn>
                    <div className="max-w-4xl mx-auto">
                        <FadeIn className="text-center mb-16 lg:mb-20">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                                Frequently Asked <Accent>Questions</Accent>
                            </h2>
                            <p className="text-lg text-slate-600">
                                Have questions? We've got answers.
                            </p>
                        </FadeIn>
                        <div className="space-y-4">
                            {FAQ_DATA.map((faq, index) => (
                                <FaqItem key={index} item={faq} />
                            ))}
                        </div>
                    </div>
                </StaggeredFadeIn>
            </Section>
        </div>
    );
}
