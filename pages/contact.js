import Head from "next/head";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function ContactPage() {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically handle form submission,
        // e.g., send the data to an API endpoint.
        alert("Thank you for your message! We will get back to you shortly.");
        e.target.reset();
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Head>
                <title>Contact Us | GymLoop</title>
                <meta
                    name="description"
                    content="Get in touch with the GymLoop team. We're here to help with any questions or feedback."
                />
            </Head>

            <main className="flex-grow py-16 sm:py-20 lg:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
                >
                    {/* --- HEADER SECTION --- */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">
                            Get in Touch
                        </h1>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                            Have a question, feedback, or a partnership inquiry? We'd love to hear
                            from you.
                        </p>
                    </div>

                    {/* --- MAIN CONTENT GRID --- */}
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* --- CONTACT FORM --- */}
                        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-lg border border-slate-200/50">
                            <h2 className="text-2xl font-semibold text-slate-800 mb-6">
                                Send us a Message
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-slate-700 mb-1"
                                    >
                                        Full Name
                                    </label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-slate-700 mb-1"
                                    >
                                        Email Address
                                    </label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="you@example.com"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="subject"
                                        className="block text-sm font-medium text-slate-700 mb-1"
                                    >
                                        Subject
                                    </label>
                                    <Input
                                        id="subject"
                                        name="subject"
                                        type="text"
                                        required
                                        placeholder="How can we help?"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-medium text-slate-700 mb-1"
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="4"
                                        required
                                        placeholder="Your message..."
                                        className="flex w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 disabled:cursor-not-allowed disabled:opacity-50"
                                    ></textarea>
                                </div>
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full bg-teal-500 text-white hover:bg-teal-600"
                                >
                                    Send Message <Send className="ml-2 h-4 w-4" />
                                </Button>
                            </form>
                        </div>

                        {/* --- CONTACT INFO --- */}
                        <div className="space-y-8">
                            <InfoCard
                                icon={<MapPin className="h-6 w-6 text-teal-500" />}
                                title="Our Office"
                                line1="House 123, Road 45"
                                line2="Gulshan 2, Dhaka 1212"
                            />
                            <InfoCard
                                icon={<Phone className="h-6 w-6 text-teal-500" />}
                                title="Call Us"
                                line1="Support: +880 171 234 5678"
                                line2="Sales: +880 181 876 5432"
                            />
                            <InfoCard
                                icon={<Mail className="h-6 w-6 text-teal-500" />}
                                title="Email Us"
                                line1="Support: support@gymloop.com.bd"
                                line2="Partners: partner@gymloop.com.bd"
                            />

                            {/* --- SOCIAL LINKS --- */}
                            <div className="pt-4">
                                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                                    Follow Us
                                </h3>
                                <div className="flex items-center space-x-4">
                                    <SocialLink href="#" icon={<Facebook size={24} />} />
                                    <SocialLink href="#" icon={<Instagram size={24} />} />
                                    <SocialLink href="#" icon={<Twitter size={24} />} />
                                    <SocialLink href="#" icon={<Linkedin size={24} />} />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}

// Helper components for styling
const InfoCard = ({ icon, title, line1, line2 }) => (
    <div className="flex items-start space-x-5">
        <div className="flex-shrink-0 p-3 bg-teal-100/70 rounded-xl">{icon}</div>
        <div>
            <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
            <p className="text-slate-600">{line1}</p>
            <p className="text-slate-600">{line2}</p>
        </div>
    </div>
);

const SocialLink = ({ href, icon }) => (
    <a
        href={href}
        className="text-slate-500 hover:text-teal-500 hover:scale-110 transform transition-all duration-300"
    >
        {icon}
    </a>
);
