import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, Target, Users, Heart, Zap, Award } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ANIMATION_VARIANTS = {
    fadeInUp: {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeInOut" },
        },
    },
    stagger: {
        visible: {
            transition: {
                staggerChildren: 0.15,
            },
        },
    },
};

const Accent = ({ children }) => <span className="text-teal-500">{children}</span>;

const VALUES = [
    {
        icon: Zap,
        title: "Empowerment",
        description:
            "We empower our members to take control of their fitness journey with ultimate flexibility and choice.",
    },
    {
        icon: Heart,
        title: "Community",
        description:
            "We're building a supportive and inclusive community that motivates and inspires every member.",
    },
    {
        icon: Award,
        title: "Excellence",
        description:
            "We partner with the best gyms and relentlessly improve our platform to deliver a premium experience.",
    },
];

const TEAM_MEMBERS = [
    {
        name: "Aovin Mahmud",
        role: "Founder",
        avatar: "/aovin.png",
        bio: "Aovin's vision and passion for fitness are the driving forces behind GymLoop, dedicated to revolutionizing the industry.",
    },
    {
        name: "Mukitur Rahman Ashik",
        role: "Co Founder",
        avatar: "/ashik.jpeg",
        bio: "Ashik is the technical and operational backbone, ensuring a seamless platform experience for members and partners.",
    },
    {
        name: "Belayet Hossain Shakil",
        role: "Director",
        avatar: "/shakil.jpg",
        bio: "As Director, Shakil drives the strategic vision of GymLoop, ensuring operational excellence and expanding our network to make fitness accessible to all.",
    },
    {
        name: "Jahidur Rahman",
        role: "Community Manager & CSR",
        avatar: "/jahid.jpg",
        bio: "Jahidur is the heart of our community, fostering a supportive environment and leading our social responsibilities.",
    },
];

export default function AboutPage() {
    return (
        <>
            <Head>
                <title>About Us | The GymLoop Story</title>
                <meta
                    name="description"
                    content="Discover the mission, vision, and the passionate team behind GymLoop—revolutionizing fitness in Bangladesh."
                />
            </Head>

            <div className="bg-white text-slate-800 antialiased">
                {/* Hero Section */}
                <motion.section
                    initial="hidden"
                    animate="visible"
                    variants={ANIMATION_VARIANTS.stagger}
                    className="relative pt-40 pb-12 text-center bg-slate-50"
                >
                    <div className="max-w-4xl mx-auto px-4">
                        <motion.p
                            variants={ANIMATION_VARIANTS.fadeInUp}
                            className="text-base font-semibold text-teal-600 uppercase tracking-wider mb-3"
                        >
                            Our Story
                        </motion.p>
                        <motion.h1
                            variants={ANIMATION_VARIANTS.fadeInUp}
                            className="text-4xl sm:text-6xl font-bold text-slate-900 mb-6 leading-tight"
                        >
                            Fitness <Accent>Freedom</Accent> for Everyone
                        </motion.h1>
                        <motion.p
                            variants={ANIMATION_VARIANTS.fadeInUp}
                            className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto"
                        >
                            We believe fitness should adapt to your life, not the other way around.
                            GymLoop was born from a simple idea: to unlock every gym in the city
                            with a single, flexible pass.
                        </motion.p>
                    </div>
                </motion.section>

                {/* Mission and Vision Section */}
                <section className="py-20 sm:py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={ANIMATION_VARIANTS.stagger}
                            className="grid md:grid-cols-2 gap-12 md:gap-16 items-center"
                        >
                            <motion.div variants={ANIMATION_VARIANTS.fadeInUp}>
                                <div className="relative w-full h-96 rounded-2xl shadow-2xl overflow-hidden">
                                    <Image
                                        src="/gym-connect.jpg"
                                        alt="Team collaborating in a modern office"
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                </div>
                            </motion.div>
                            <motion.div variants={ANIMATION_VARIANTS.fadeInUp}>
                                <div className="space-y-8">
                                    <div>
                                        <div className="flex items-center mb-3">
                                            <Target className="h-7 w-7 text-teal-500 mr-3" />
                                            <h2 className="text-3xl font-bold text-slate-900">
                                                Our Mission
                                            </h2>
                                        </div>
                                        <p className="text-lg text-slate-600">
                                            To make fitness accessible, enjoyable, and social for
                                            everyone in Bangladesh by connecting them to a vast
                                            network of top-tier gyms through one simple, powerful
                                            pass.
                                        </p>
                                    </div>
                                    <div>
                                        <div className="flex items-center mb-3">
                                            <Users className="h-7 w-7 text-teal-500 mr-3" />
                                            <h2 className="text-3xl font-bold text-slate-900">
                                                Our Vision
                                            </h2>
                                        </div>
                                        <p className="text-lg text-slate-600">
                                            To create a future where your fitness routine is as
                                            dynamic as you are, empowering you to work out wherever
                                            and whenever you choose, without limits.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Core Values Section */}
                <section className="bg-slate-50 py-20 sm:py-28">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={ANIMATION_VARIANTS.stagger}
                            className="text-center"
                        >
                            <motion.h2
                                variants={ANIMATION_VARIANTS.fadeInUp}
                                className="text-3xl sm:text-5xl font-bold text-slate-900 mb-6"
                            >
                                The Values That <Accent>Drive Us</Accent>
                            </motion.h2>
                            <motion.p
                                variants={ANIMATION_VARIANTS.fadeInUp}
                                className="text-lg text-slate-600 max-w-2xl mx-auto mb-16"
                            >
                                Our principles are the foundation of our product, our company, and
                                our community.
                            </motion.p>
                        </motion.div>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={ANIMATION_VARIANTS.stagger}
                            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {VALUES.map((value, index) => {
                                const Icon = value.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        variants={ANIMATION_VARIANTS.fadeInUp}
                                        className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-teal-500"
                                    >
                                        <Icon className="h-10 w-10 text-teal-500 mb-5" />
                                        <h3 className="text-2xl font-bold text-slate-900 mb-3">
                                            {value.title}
                                        </h3>
                                        <p className="text-slate-600">{value.description}</p>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </section>

                {/* Meet the Team Section */}
                <section className="py-20 sm:py-28">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={ANIMATION_VARIANTS.stagger}
                            className="text-center"
                        >
                            <motion.h2
                                variants={ANIMATION_VARIANTS.fadeInUp}
                                className="text-3xl sm:text-5xl font-bold text-slate-900 mb-6"
                            >
                                Meet the <Accent>Innovators</Accent>
                            </motion.h2>
                            <motion.p
                                variants={ANIMATION_VARIANTS.fadeInUp}
                                className="text-lg text-slate-600 max-w-2xl mx-auto mb-16"
                            >
                                We are a passionate group of fitness lovers, technologists, and
                                community builders dedicated to your wellness.
                            </motion.p>
                        </motion.div>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={ANIMATION_VARIANTS.stagger}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12" // Changed to 4 columns for the new member
                        >
                            {TEAM_MEMBERS.map((member, index) => (
                                <motion.div
                                    key={index}
                                    variants={ANIMATION_VARIANTS.fadeInUp}
                                    className="text-center"
                                >
                                    <div className="relative h-40 w-40 sm:h-48 sm:w-48 mx-auto mb-5">
                                        <Image
                                            src={member.avatar}
                                            alt={`Portrait of ${member.name}`}
                                            layout="fill"
                                            objectFit="cover"
                                            className="rounded-full"
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900">
                                        {member.name}
                                    </h3>
                                    <p className="text-teal-600 font-medium mb-2">{member.role}</p>
                                    <p className="text-slate-600 text-sm">{member.bio}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-slate-800">
                    <div className="max-w-4xl mx-auto text-center py-20 sm:py-24 px-4">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            variants={ANIMATION_VARIANTS.fadeInUp}
                        >
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                                Join the Fitness Revolution
                            </h2>
                            <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
                                Ready to experience the freedom and flexibility of GymLoop? Your
                                next workout is just a tap away.
                            </p>
                            <Link href="/pricing" passHref>
                                <Button
                                    size="lg"
                                    className="bg-teal-500 text-white font-semibold py-3 px-10 rounded-full shadow-lg hover:bg-teal-600 transition-all duration-300 transform hover:scale-105"
                                >
                                    Become a Member
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </div>
        </>
    );
}
