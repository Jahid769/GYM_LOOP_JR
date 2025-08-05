import { useState, useCallback, memo } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { motion } from "framer-motion";
import { User, Lock, Dumbbell, Loader2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Reusable, styled, and memoized input component for the form
const AuthInput = memo(
    ({
        id,
        label,
        type,
        value,
        onChange,
        placeholder,
        Icon,
        isPassword,
        showPassword,
        togglePassword,
    }) => (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-slate-700">
                {label}
            </label>
            <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon className="h-5 w-5 text-slate-400" />
                </div>
                <Input
                    id={id}
                    name={id}
                    type={type}
                    required
                    value={value}
                    onChange={onChange}
                    className="block w-full pl-10 pr-4 py-2 h-11 bg-slate-100 border-slate-200 focus:bg-white focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
                    placeholder={placeholder}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={togglePassword}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-teal-500"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
            </div>
        </div>
    )
);
AuthInput.displayName = "AuthInput";

export default function Signup() {
    const router = useRouter();
    const [formData, setFormData] = useState({ name: "", mobile: "", password: "" });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError(""); // Clear error on new input
    }, []);

    const validateForm = useCallback(() => {
        const { name, mobile, password } = formData;
        if (!name.trim()) {
            setError("Full name is required.");
            return false;
        }
        // Use the raw number for validation
        const mobileDigits = mobile.replace(/\D/g, "");
        if (!mobileDigits || mobileDigits.length !== 9) {
            setError("Please enter a valid 9-digit mobile number.");
            return false;
        }
        if (!/^[3-9]\d{8}$/.test(mobileDigits)) {
            setError("Mobile number must start with 3, 4, 5, 6, 7, 8, or 9.");
            return false;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return false;
        }
        return true;
    }, [formData]);

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            if (!validateForm()) return;

            setIsLoading(true);
            try {
                const apiPayload = {
                    name: formData.name,
                    mobile: `+8801${formData.mobile}`,
                    password: formData.password,
                };
                const res = await fetch("/api/auth/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(apiPayload),
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.message || "Something went wrong");

                router.push("/login?registered=true");
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        },
        [formData, router, validateForm]
    );

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Head>
                <title>Sign Up | GymLoop</title>
                <meta
                    name="description"
                    content="Join GymLoop and create your account for flexible gym access across Bangladesh."
                />
            </Head>

            <main className="flex-grow flex items-center justify-center px-4 py-16 sm:py-20 lg:py-24">
                <div className="w-full max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="grid lg:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200/50"
                    >
                        {/* Left Panel - Branding */}
                        <div className="hidden lg:flex flex-col items-center justify-center p-12 bg-gradient-to-br from-teal-500 to-teal-600 text-white">
                            <Dumbbell className="h-20 w-20 mb-6" />
                            <h2 className="text-3xl font-bold mb-2 text-center">
                                Start Your Fitness Journey
                            </h2>
                            <p className="text-teal-100 text-center">
                                Create an account to unlock a world of fitness possibilities.
                            </p>
                        </div>

                        {/* Right Panel - Form */}
                        <div className="p-8 sm:p-12 space-y-6">
                            <div className="text-center lg:text-left">
                                <h2 className="text-3xl font-bold text-slate-900">
                                    Create Account
                                </h2>
                                <p className="mt-2 text-sm text-slate-600">
                                    Already have an account?{" "}
                                    <Link
                                        href="/login"
                                        className="font-medium text-teal-500 hover:text-teal-600"
                                    >
                                        Sign In
                                    </Link>
                                </p>
                            </div>

                            {error && (
                                <p className="p-3 bg-red-50 text-red-700 rounded-md text-sm text-center">
                                    {error}
                                </p>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <AuthInput
                                    id="name"
                                    label="Full Name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Anisur Rahman"
                                    Icon={User}
                                />

                                <div>
                                    <label
                                        htmlFor="mobile"
                                        className="block text-sm font-medium text-slate-700"
                                    >
                                        Mobile Number
                                    </label>
                                    <div className="mt-1 flex items-center">
                                        <div className="flex items-center justify-center px-3 py-2 h-11 border border-r-0 border-slate-200 bg-slate-100 rounded-l-lg">
                                            <span className="text-slate-500 text-sm">+8801</span>
                                        </div>
                                        <Input
                                            id="mobile"
                                            name="mobile"
                                            type="tel"
                                            required
                                            value={formData.mobile}
                                            onChange={(e) => {
                                                const digits = e.target.value.replace(/\D/g, "");
                                                handleInputChange({
                                                    target: { name: "mobile", value: digits },
                                                });
                                            }}
                                            className="block w-full h-11 bg-slate-100 border-slate-200 rounded-l-none rounded-r-lg focus:bg-white focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
                                            placeholder="XXXXXXXXX"
                                            maxLength={9}
                                        />
                                    </div>
                                </div>

                                <AuthInput
                                    id="password"
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="8+ characters"
                                    Icon={Lock}
                                    isPassword
                                    showPassword={showPassword}
                                    togglePassword={() => setShowPassword(!showPassword)}
                                />

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-11 text-base font-semibold bg-teal-500 hover:bg-teal-600 text-white"
                                >
                                    {isLoading ? (
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    ) : (
                                        "Create Account"
                                    )}
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
