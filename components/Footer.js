import Link from "next/link";
import React from "react";
import { Dumbbell, ArrowRight, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

// A reusable component for footer links to reduce repetition
const FooterLink = ({ href, children }) => (
    <li>
        <Link
            href={href}
            className="text-slate-600 hover:text-teal-500 transition-colors duration-300"
        >
            {children}
        </Link>
    </li>
);

export default function Footer() {
    return (
        <footer className="bg-white border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Column 1: Brand and Newsletter */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center space-x-3 group mb-6">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                                <Dumbbell className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-slate-800">
                                Gym<span className="text-teal-500">Loop</span>
                            </span>
                        </Link>
                        <p className="text-slate-600 max-w-sm leading-relaxed mb-8">
                            Your pass to fitness freedom. Unlock premium gyms across Bangladesh with
                            a single, flexible membership.
                        </p>
                        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                            Stay Updated
                        </h4>
                        <form className="flex w-full max-w-sm">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 text-slate-800 bg-slate-100 border border-slate-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
                            />
                            <button
                                type="submit"
                                aria-label="Subscribe to newsletter"
                                className="p-3 bg-teal-500 text-white rounded-r-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-colors"
                            >
                                <ArrowRight className="h-5 w-5" />
                            </button>
                        </form>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">
                            Explore
                        </h4>
                        <ul className="space-y-4">
                            <FooterLink href="/gyms">Find a Gym</FooterLink>
                            <FooterLink href="/pricing">Pricing</FooterLink>
                            <FooterLink href="/about">About Us</FooterLink>
                            <FooterLink href="/blog">Blog</FooterLink>
                        </ul>
                    </div>

                    {/* Column 3: Support */}
                    <div>
                        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">
                            Support
                        </h4>
                        <ul className="space-y-4">
                            <FooterLink href="/faq">FAQ</FooterLink>
                            <FooterLink href="/contact">Contact Us</FooterLink>
                            <FooterLink href="/dashboard/user">My Account</FooterLink>
                            <FooterLink href="/dashboard/admin">Partner Dashboard</FooterLink>
                        </ul>
                    </div>

                    {/* Column 4: Get The App */}
                    <div>
                        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">
                            Get The App
                        </h4>
                        <div className="space-y-3">
                            <a
                                href="#"
                                className="flex items-center p-3 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors"
                            >
                                {/* Placeholder for Apple icon */}
                                <span className="text-2xl mr-3"></span>
                                <div>
                                    <p className="text-xs">Download on the</p>
                                    <p className="text-lg font-semibold leading-tight">App Store</p>
                                </div>
                            </a>
                            <a
                                href="#"
                                className="flex items-center p-3 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors"
                            >
                                {/* Placeholder for Google Play icon */}
                                <svg
                                    className="w-6 h-6 mr-3"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M3 20.4V3.6C3 3.2 3.2 3 3.5 3L13.2 12L3.5 21C3.2 20.8 3 20.6 3 20.4Z" />
                                    <path d="M14.6 13.1L5 21.6C5.5 22 6.1 22.1 6.8 21.8L18.4 15.6C19.4 15.1 20 14.1 20 13.1V13.1C20 12.1 19.4 11.1 18.4 10.6L6.8 4.4C6.1 4.1 5.5 4.2 5 4.6L14.6 13.1Z" />
                                    <path d="M20.6 14.2L22.8 13C23.5 12.6 23.5 11.6 22.8 11.2L20.6 10C20.3 9.8 20.1 9.5 20.1 9.2V6.5C20.1 5.8 19.2 5.5 18.7 6L16.8 7.4C16.5 7.6 16.2 7.7 15.9 7.7L13.1 7.4C12.4 7.3 12.1 8.2 12.5 8.7L14.1 10.7C14.3 11 14.4 11.3 14.4 11.6L14.1 14.5C14 15.2 14.8 15.7 15.4 15.3L16.8 14.3C17.1 14.1 17.4 14 17.7 14L20.1 14.9C20.3 15 20.4 14.8 20.6 14.2Z" />
                                </svg>
                                <div>
                                    <p className="text-xs">GET IT ON</p>
                                    <p className="text-lg font-semibold leading-tight">
                                        Google Play
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-sm text-slate-500">
                    <p className="mb-4 sm:mb-0">
                        &copy; {new Date().getFullYear()} Gym Loop. All Rights Reserved. Developed
                        by{" "}
                        <strong>
                            <a href="https:dotinverse.com" target="_blank">
                                Dotinverse
                            </a>
                        </strong>
                    </p>
                    <div className="flex items-center space-x-6">
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                aria-label="Facebook"
                                className="text-slate-500 hover:text-teal-500 transition-colors"
                            >
                                <Facebook size={20} />
                            </a>
                            <a
                                href="#"
                                aria-label="Instagram"
                                className="text-slate-500 hover:text-teal-500 transition-colors"
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href="#"
                                aria-label="Twitter"
                                className="text-slate-500 hover:text-teal-500 transition-colors"
                            >
                                <Twitter size={20} />
                            </a>
                            <a
                                href="#"
                                aria-label="LinkedIn"
                                className="text-slate-500 hover:text-teal-500 transition-colors"
                            >
                                <Linkedin size={20} />
                            </a>
                        </div>
                        <div className="flex space-x-4">
                            <Link href="/terms" className="hover:text-teal-500 transition-colors">
                                Terms
                            </Link>
                            <Link href="/privacy" className="hover:text-teal-500 transition-colors">
                                Privacy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
