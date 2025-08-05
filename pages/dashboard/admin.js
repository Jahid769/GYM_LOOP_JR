import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Wallet, Activity, TrendingUp, LogOut, CreditCard } from "lucide-react";

const StatCard = ({ title, value, icon, prefix = "", suffix = "" }) => (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200/50">
        <div className="flex justify-between items-start">
            <h3 className="text-base font-medium text-slate-600">{title}</h3>
            <div className="p-2 bg-teal-100/70 rounded-lg">{icon}</div>
        </div>
        <p className="text-3xl font-bold text-slate-900 mt-2">
            {prefix}
            {value}
            {suffix}
        </p>
    </div>
);

export default function PartnerDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({
        monthlyStats: { checkIns: 0, payout: 0 },
        payoutHistory: [],
        recentCheckIns: [],
    });

    const isPageLoading = status === "loading" || isLoading;
    const bdtPerCredit = parseFloat(process.env.NEXT_PUBLIC_BDT_PER_CREDIT) || 150;

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        } else if (status === "authenticated" && session?.user?.role !== "admin") {
            router.push(`/dashboard/${session.user.role || "user"}`);
        }
    }, [status, session, router]);

    useEffect(() => {
        if (status === "authenticated" && session?.user?.role === "admin") {
            const fetchPartnerData = async () => {
                setIsLoading(true);
                try {
                    const res = await fetch("/api/partner/stats");
                    if (res.ok) {
                        const data = await res.json();
                        setStats((prevStats) => ({
                            ...prevStats,
                            ...data,
                            monthlyStats: data.monthlyStats || prevStats.monthlyStats,
                        }));
                    }
                } catch (error) {
                    console.error("Error fetching partner data:", error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchPartnerData();
        }
    }, [status, session]);

    if (isPageLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-teal-500" />
            </div>
        );
    }

    const currentDate = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const monthlyCreditsEarned = stats.monthlyStats.payout;
    const monthlyEarnings = monthlyCreditsEarned * bdtPerCredit;
    const totalCreditsAllTime = stats.payoutHistory.reduce((acc, curr) => acc + curr.payout, 0);

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Head>
                <title>Partner Dashboard | GymLoop</title>
                <meta
                    name="description"
                    content="Manage your gym, track earnings, and view activity on GymLoop."
                />
            </Head>

            <main className="flex-grow">
                <div className="max-w-7xl mx-auto py-16 sm:py-20 lg:py-40">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Partner Dashboard</h1>
                            <p className="mt-1 text-slate-600">
                                Welcome back! Here's your summary for {currentDate}.
                            </p>
                        </div>
                        <Button
                            onClick={() => signOut({ callbackUrl: "/login" })}
                            variant="outline"
                            className="flex items-center gap-2 text-slate-700 hover:text-red-600 hover:bg-red-50/50 border-slate-300 hover:border-red-300 w-full sm:w-auto"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </Button>
                    </div>
                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 max-w-md bg-slate-200/80">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="payouts">Payouts</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview" className="mt-6">
                            <div className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <StatCard
                                        title="Est. Earnings (Month)"
                                        value={monthlyEarnings.toLocaleString()}
                                        prefix="৳"
                                        icon={<Wallet className="h-6 w-6 text-teal-600" />}
                                    />
                                    <StatCard
                                        title="Check-ins (Month)"
                                        value={stats.monthlyStats.checkIns.toLocaleString()}
                                        icon={<Activity className="h-6 w-6 text-teal-600" />}
                                    />
                                    <StatCard
                                        title="Total Credits Earned (All Time)"
                                        value={totalCreditsAllTime.toLocaleString()}
                                        suffix=" credits"
                                        icon={<CreditCard className="h-6 w-6 text-teal-600" />}
                                    />
                                </div>
                                <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-200/50">
                                    <h2 className="text-xl font-semibold text-slate-900 mb-6">
                                        Recent Check-in Activity
                                    </h2>
                                    {stats.recentCheckIns.length === 0 ? (
                                        <p className="text-center text-slate-500 py-12">
                                            No recent check-ins.
                                        </p>
                                    ) : (
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full">
                                                <thead className="border-b border-slate-200">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                                                        >
                                                            User
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                                                        >
                                                            Mobile
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                                                        >
                                                            Date & Time
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-5 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider"
                                                        >
                                                            Credits Earned
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100">
                                                    {stats.recentCheckIns.map((checkIn) => (
                                                        <tr
                                                            key={checkIn._id}
                                                            className="hover:bg-slate-50 transition-colors"
                                                        >
                                                            <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-slate-800">
                                                                {checkIn.userName}
                                                            </td>
                                                            <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-600">
                                                                {checkIn.userMobile}
                                                            </td>
                                                            <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-600">
                                                                {new Date(
                                                                    checkIn.timestamp
                                                                ).toLocaleString("en-GB")}
                                                            </td>
                                                            <td className="px-5 py-4 whitespace-nowrap text-sm font-semibold text-teal-700 text-right">
                                                                {checkIn.earnedCredit}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="payouts" className="mt-6">
                            <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-200/50">
                                <h2 className="text-xl font-semibold text-slate-900 mb-6">
                                    Payout History
                                </h2>
                                {stats.payoutHistory.length === 0 ? (
                                    <p className="text-center text-slate-500 py-12">
                                        No payout history available.
                                    </p>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full">
                                            <thead className="border-b border-slate-200">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                                                    >
                                                        Month
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                                                    >
                                                        Credits Earned
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-5 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider"
                                                    >
                                                        Total Payout
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                {stats.payoutHistory.map((payout) => (
                                                    <tr
                                                        key={payout.month}
                                                        className="hover:bg-slate-50 transition-colors"
                                                    >
                                                        <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-slate-800">
                                                            {payout.month}
                                                        </td>
                                                        <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-600">
                                                            {payout.payout}
                                                        </td>
                                                        <td className="px-5 py-4 whitespace-nowrap text-sm font-semibold text-teal-700 text-right">
                                                            ৳
                                                            {(
                                                                payout.payout * bdtPerCredit
                                                            ).toLocaleString()}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    );
}
