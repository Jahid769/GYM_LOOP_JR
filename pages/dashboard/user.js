import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState, useEffect, memo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Loader2,
    CreditCard,
    Wallet,
    MapPin,
    Search,
    Dumbbell,
    LogOut,
    User,
    History,
    X,
    Star,
    CheckCircle,
} from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const StatCard = memo(({ icon, value, label }) => (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200/50 flex items-center space-x-4">
        <div className="p-3 bg-teal-100/70 rounded-xl">{icon}</div>
        <div>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
            <p className="text-sm font-medium text-slate-600">{label}</p>
        </div>
    </div>
));
StatCard.displayName = "StatCard";

const GymCard = memo(({ gym, onCheckIn, isCheckingIn, selectedGym }) => (
    <div className="bg-white rounded-2xl shadow-md border border-slate-200/50 overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="relative">
            <img src={gym.image} alt={gym.name} className="w-full h-48 object-cover" />
            <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
                <Star className="h-4 w-4 text-teal-500" /> {gym.rating}
            </div>
        </div>
        <div className="p-5 flex flex-col flex-1">
            <h3 className="font-bold text-lg text-slate-900 mb-2">{gym.name}</h3>
            <p className="text-slate-600 text-sm flex items-start gap-2 mb-2">
                <MapPin className="h-4 w-4 text-teal-500 mt-0.5 flex-shrink-0" />
                <span>{gym.address}</span>
            </p>
            <p className="text-slate-600 text-sm flex items-center gap-2 mb-4 font-medium">
                <CreditCard className="h-4 w-4 text-teal-500 flex-shrink-0" />
                <span>
                    {gym.creditCost} {gym.creditCost === 1 ? "credit" : "credits"} per check-in
                </span>
            </p>
            <div className="mt-auto">
                <Button
                    size="lg"
                    className="bg-teal-500 hover:bg-teal-600 text-white font-semibold w-full rounded-lg"
                    onClick={() => onCheckIn(gym._id)}
                    disabled={isCheckingIn}
                >
                    {isCheckingIn && selectedGym === gym._id ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        "Check In Now"
                    )}
                </Button>
            </div>
        </div>
    </div>
));
GymCard.displayName = "GymCard";

const AccountModal = memo(({ accountData, user }) => {
    const getInitials = (name) => {
        if (!name) return "?";
        const names = name.split(" ");
        if (names.length > 1) {
            return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="p-2 h-10 w-10 rounded-full hover:bg-teal-100/50 text-slate-700 hover:text-teal-600 border-slate-300 hover:border-teal-300"
                >
                    <User className="h-5 w-5" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl w-full bg-slate-50 border-0 shadow-xl rounded-2xl p-0">
                <DialogHeader className="p-6 text-left">
                    <DialogTitle className="text-2xl font-bold text-slate-900">
                        My Account
                    </DialogTitle>
                </DialogHeader>
                {!accountData ? (
                    <div className="flex justify-center items-center h-96">
                        <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
                    </div>
                ) : (
                    <div className="px-6 pb-6">
                        <div className="flex items-center space-x-4 mb-8">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white text-2xl font-bold">
                                {getInitials(user?.name)}
                            </div>
                            <div>
                                <p className="text-xl font-bold text-slate-800">{user?.name}</p>
                                <p className="text-sm text-slate-500">
                                    {user?.email || "No email provided"}
                                </p>
                            </div>
                        </div>
                        <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="grid w-full grid-cols-3 bg-slate-200/80">
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="check-ins">Check-in History</TabsTrigger>
                                <TabsTrigger value="billing">Billing</TabsTrigger>
                            </TabsList>
                            <TabsContent value="overview" className="py-6">
                                {/* ... */}
                            </TabsContent>
                            <TabsContent value="check-ins" className="py-6">
                                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200/80">
                                    <h3 className="font-semibold text-lg mb-4 text-slate-800">
                                        Check-in History
                                    </h3>
                                    <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                                        {accountData.checkIns && accountData.checkIns.length > 0 ? (
                                            accountData.checkIns.map((checkIn) => (
                                                <div
                                                    key={checkIn._id || checkIn.timestamp}
                                                    className="flex items-center space-x-4 p-3 bg-slate-50/70 rounded-lg"
                                                >
                                                    <div className="p-2 bg-teal-100/70 rounded-full">
                                                        <MapPin className="h-5 w-5 text-teal-600" />
                                                    </div>
                                                    <div className="flex-grow">
                                                        <p className="font-medium text-slate-800">
                                                            {checkIn.gymName}
                                                        </p>
                                                        <p className="text-xs text-slate-500">
                                                            {checkIn.gymAddress}
                                                        </p>
                                                    </div>
                                                    <p className="text-xs text-slate-500 text-right shrink-0">
                                                        {new Date(checkIn.timestamp).toLocaleString(
                                                            "en-GB"
                                                        )}
                                                    </p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-center text-slate-500 py-10">
                                                You haven't checked in anywhere yet.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="billing" className="py-6">
                                {/* ... */}
                            </TabsContent>
                        </Tabs>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
});
AccountModal.displayName = "AccountModal";

export default function UserDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [credits, setCredits] = useState(0);
    const [accountData, setAccountData] = useState(null);
    const [gymData, setGymData] = useState({ gyms: [], districts: [] });
    const [selectedDistrict, setSelectedDistrict] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [isCheckingIn, setIsCheckingIn] = useState(false);
    const [selectedGym, setSelectedGym] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") router.push("/login");
        else if (status === "authenticated" && session?.user?.role !== "user") {
            router.push(`/dashboard/${session.user.role || "user"}`);
        }
    }, [status, session, router]);

    useEffect(() => {
        const fetchInitialData = async () => {
            setIsLoading(true);
            try {
                const [creditsRes, accountRes, gymsRes] = await Promise.all([
                    fetch("/api/user/credits"),
                    fetch("/api/user/account"),
                    fetch("/api/gyms"),
                ]);
                if (creditsRes.ok) setCredits((await creditsRes.json()).credits);
                if (accountRes.ok) setAccountData(await accountRes.json());
                if (gymsRes.ok) {
                    const data = await gymsRes.json();
                    const uniqueDistricts = [
                        ...new Set(data.gyms.map((gym) => gym.district)),
                    ].sort();
                    setGymData({ gyms: data.gyms, districts: uniqueDistricts });
                }
            } catch (error) {
                toast.error("An error occurred while loading dashboard.");
            } finally {
                setIsLoading(false);
            }
        };
        if (status === "authenticated") fetchInitialData();
    }, [status]);

    const handleCheckIn = async (gymId) => {
        const gym = gymData.gyms.find((g) => g._id === gymId);
        if (!gym) return;
        if (credits < gym.creditCost) {
            toast.error(
                `You need ${gym.creditCost} credits for this gym, but you only have ${credits}.`
            );
            return;
        }
        setIsCheckingIn(true);
        setSelectedGym(gymId);
        try {
            const res = await fetch("/api/user/check-in", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ gymId }),
            });
            const data = await res.json();
            if (res.ok) {
                setCredits(data.newCredits);
                setAccountData((prevData) => {
                    if (!prevData) return null;
                    const newCheckIns = [data.checkIn, ...(prevData.checkIns || [])];
                    return {
                        ...prevData,
                        checkIns: newCheckIns,
                        currentPlan: { ...prevData.currentPlan, credits: data.newCredits },
                    };
                });
                toast.success(`Successfully checked in! ${data.newCredits} credits remaining.`);
            } else {
                toast.error(data.message || "Failed to check in.");
            }
        } catch (error) {
            toast.error("An error occurred during check-in.");
        } finally {
            setIsCheckingIn(false);
            setSelectedGym(null);
        }
    };

    const filteredGyms = gymData.gyms.filter((gym) => {
        const matchesDistrict =
            selectedDistrict === "all" ||
            gym.district.toLowerCase() === selectedDistrict.toLowerCase();
        const matchesSearch =
            !searchQuery ||
            gym.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            gym.address.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesDistrict && matchesSearch;
    });

    if (status === "loading" || isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-teal-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Head>
                <title>Dashboard | GymLoop</title>
            </Head>

            <main className="flex-grow">
                <div className="max-w-7xl mx-auto py-16 sm:py-20 lg:py-40">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">
                                Welcome, {session?.user?.name || "User"}!
                            </h1>
                            <p className="mt-1 text-slate-600">
                                Ready for your next workout? Let's get moving.
                            </p>
                        </div>
                        <div className="flex items-center gap-3 self-end sm:self-center">
                            <AccountModal accountData={accountData} user={session?.user} />
                            <Button
                                onClick={() => signOut({ callbackUrl: "/login" })}
                                variant="outline"
                                className="flex items-center gap-2 text-slate-700 hover:text-red-600 hover:bg-red-50/50 border-slate-300 hover:border-red-300"
                            >
                                <LogOut className="h-4 w-4" /> Logout
                            </Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <StatCard
                            icon={<CreditCard className="h-6 w-6 text-teal-600" />}
                            value={credits}
                            label="Credits Remaining"
                        />
                        <StatCard
                            icon={<Dumbbell className="h-6 w-6 text-teal-600" />}
                            value={accountData?.currentPlan?.name || "N/A"}
                            label="Current Plan"
                        />
                        <StatCard
                            icon={<CheckCircle className="h-6 w-6 text-teal-600" />}
                            value={accountData?.checkIns?.length || 0}
                            label="Total Check-ins"
                        />
                    </div>
                    <div className="space-y-6">
                        <div className="bg-white p-4 rounded-2xl shadow-md border border-slate-200/50 flex flex-col md:flex-row items-center gap-4">
                            <div className="w-full flex-1 flex items-center">
                                <Search className="h-5 w-5 text-slate-400 ml-2 mr-3" />
                                <Input
                                    type="text"
                                    placeholder="Search by gym name or location..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="border-0 shadow-none focus:ring-0 px-0 bg-transparent h-10"
                                />
                            </div>
                            <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                                <SelectTrigger className="w-full md:w-48 h-10 bg-slate-100 border-slate-200">
                                    <SelectValue placeholder="Filter by area" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Areas</SelectItem>
                                    {gymData.districts.map((d) => (
                                        <SelectItem key={d} value={d}>
                                            {d}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">
                                Available Gyms ({filteredGyms.length})
                            </h2>
                            {isLoading ? (
                                <div className="text-center py-16">
                                    <Loader2 className="h-8 w-8 animate-spin text-teal-500 mx-auto" />
                                </div>
                            ) : filteredGyms.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {filteredGyms.map((gym) => (
                                        <GymCard
                                            key={gym._id}
                                            gym={gym}
                                            onCheckIn={handleCheckIn}
                                            isCheckingIn={isCheckingIn}
                                            selectedGym={selectedGym}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16 bg-white rounded-2xl">
                                    <p className="text-slate-600">
                                        No gyms found matching your criteria.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
