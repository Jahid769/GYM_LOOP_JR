import { useRouter } from "next/router";
import { signIn, getSession, useSession } from "next-auth/react";
import { useState, useCallback, useMemo, memo, useEffect } from "react";
import { Eye, EyeOff, Lock, User, Dumbbell, Loader2 } from "lucide-react";
import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
        maxLength,
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
                    maxLength={maxLength}
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

export default function Login() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const { registered } = router.query;
    const canonicalUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL || ""}${router.asPath}`;

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/dashboard");
        }
    }, [router, status]);

    const [formData, setFormData] = useState({ mobile: "", password: "" });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError(""); // Clear error on new input
    }, []);

    const validateForm = useCallback(() => {
        const { mobile, password } = formData;
        if (!mobile || !password) {
            setError("Both fields are required.");
            return false;
        }
        if (!/^\d{9}$/.test(mobile)) {
            setError("Please enter a valid 9-digit mobile number.");
            return false;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return false;
        }
        return true;
    }, [formData]);

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            setError("");
            if (!validateForm()) return;

            setIsLoading(true);
            try {
                const mobileNumber = `+8801${formData.mobile}`;
                const result = await signIn("credentials", {
                    mobile: mobileNumber,
                    password: formData.password,
                    redirect: false,
                });

                if (result?.error) {
                    setError(result.error);
                } else {
                    router.push("/dashboard");
                }
            } catch (err) {
                setError("An unexpected error occurred. Please try again.");
            } finally {
                setIsLoading(false);
            }
        },
        [formData, router, validateForm]
    );

    // Show a loading skeleton while checking the session
    if (status === "loading") {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-teal-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Head>
                <title>Login | GymLoop</title>
                <meta
                    name="description"
                    content="Sign in to your GymLoop account to access your fitness dashboard and explore partner gyms."
                />
                <link rel="canonical" href={canonicalUrl} />
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
                                Welcome Back to GymLoop
                            </h2>
                            <p className="text-teal-100 text-center">
                                Your pass to fitness freedom is just a login away.
                            </p>
                        </div>

                        {/* Right Panel - Form */}
                        <div className="p-8 sm:p-12 space-y-6">
                            <div className="text-center lg:text-left">
                                <h2 className="text-3xl font-bold text-slate-900">Sign In</h2>
                                <p className="mt-2 text-sm text-slate-600">
                                    Don't have an account?{" "}
                                    <Link
                                        href="/signup"
                                        className="font-medium text-teal-500 hover:text-teal-600"
                                    >
                                        Sign Up
                                    </Link>
                                </p>
                            </div>

                            {/* Success message from registration */}
                            {registered === "true" && (
                                <p className="p-3 bg-green-50 text-green-700 rounded-md text-sm text-center">
                                    Successfully registered! Please log in.
                                </p>
                            )}

                            {/* Error message */}
                            {error && (
                                <p className="p-3 bg-red-50 text-red-700 rounded-md text-sm text-center">
                                    {error}
                                </p>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
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
                                            onChange={handleInputChange}
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
                                    placeholder="••••••••"
                                    Icon={Lock}
                                    isPassword
                                    showPassword={showPassword}
                                    togglePassword={() => setShowPassword(!showPassword)}
                                />

                                <div className="text-right">
                                    <Link
                                        href="/forgot-password"
                                        className="text-sm font-medium text-teal-500 hover:text-teal-600"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-11 text-base font-semibold bg-teal-500 hover:bg-teal-600 text-white"
                                >
                                    {isLoading ? (
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    ) : (
                                        "Sign In"
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

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (session) {
        return {
            redirect: {
                destination: "/dashboard",
                permanent: false,
            },
        };
    }
    return { props: {} };
}
