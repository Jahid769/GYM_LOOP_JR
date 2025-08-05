import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
    Loader2,
    DollarSign,
    Users,
    Activity,
    LogOut,
    UserPlus,
    Home,
    TrendingUp,
    CreditCard,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// A reusable Stat Card component for the dashboard
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

export default function OwnerDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    // State Management
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({
        todayRevenue: 0,
        todayCheckIns: 0,
        todayCredits: 0,
        totalAllTimeCredits: 0,
        totalRevenue: 0, // Add totalRevenue to initial state
    });
    const [partners, setPartners] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [partnerForm, setPartnerForm] = useState({
        name: "",
        mobile: "",
        password: "",
        role: "admin",
    });
    const [gymForm, setGymForm] = useState({
        name: "",
        address: "",
        district: "",
        image: "",
        partnerId: "",
        creditCost: 1,
    });

    // Handle authentication and redirection
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        } else if (status === "authenticated" && session?.user?.role !== "owner") {
            router.push(`/dashboard/${session.user.role || "user"}`);
        }
    }, [status, session, router]);

    // Fetch initial data for the dashboard
    useEffect(() => {
        if (status === "authenticated" && session?.user?.role === "owner") {
            const fetchData = async () => {
                setIsLoading(true);
                try {
                    const [statsRes, partnersRes] = await Promise.all([
                        fetch("/api/owner/stats"),
                        fetch("/api/owner/get-partners"),
                    ]);
                    if (statsRes.ok) {
                        setStats(await statsRes.json());
                    } else {
                        toast.error("Failed to load platform stats.");
                    }
                    if (partnersRes.ok) {
                        setPartners((await partnersRes.json()).partners);
                    } else {
                        toast.error("Failed to load partner list.");
                    }
                } catch (error) {
                    toast.error("An error occurred while loading dashboard data.");
                } finally {
                    setIsLoading(false);
                }
            };
            fetchData();
        }
    }, [status, session]);

    // Form input handlers and submission handlers remain the same...
    const handlePartnerFormChange = (e) =>
        setPartnerForm({ ...partnerForm, [e.target.name]: e.target.value });
    const handlePartnerSelectChange = (value, name) =>
        setPartnerForm({ ...partnerForm, [name]: value });
    const handleGymFormChange = (e) => setGymForm({ ...gymForm, [e.target.name]: e.target.value });
    const handleGymSelectChange = (value, name) => setGymForm({ ...gymForm, [name]: value });
    const handleCreatePartner = async (e) => {
        e.preventDefault();
        // Frontend validation
        if (!partnerForm.role) {
            toast.error("Please select an account role.");
            return;
        }
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/owner/create-partner", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(partnerForm),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            toast.success("Partner account created successfully!");
            setPartnerForm({ name: "", mobile: "", password: "", role: "admin" });
            // Refresh partner list after creation
            const partnersRes = await fetch("/api/owner/get-partners");
            if (partnersRes.ok) setPartners((await partnersRes.json()).partners);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };
    const handleCreateGym = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/owner/create-gym", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(gymForm),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            toast.success("Gym listed successfully!");
            setGymForm({
                name: "",
                address: "",
                district: "",
                image: "",
                partnerId: "",
                creditCost: 1,
            });
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

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
                <title>Owner Dashboard | GymLoop</title>
            </Head>

            <main className="flex-grow">
                <div className="max-w-7xl mx-auto py-16 sm:py-20 lg:py-40">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Owner Dashboard</h1>
                            <p className="mt-1 text-slate-600">
                                Welcome, {session?.user?.name || "Owner"}. Manage your platform
                                here.
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
                        <TabsList className="grid w-full grid-cols-3 max-w-xl bg-slate-200/80">
                            <TabsTrigger value="overview">Platform Overview</TabsTrigger>
                            <TabsTrigger value="manage-partners">Manage Partners</TabsTrigger>
                            <TabsTrigger value="manage-gyms">Manage Gyms</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="mt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <StatCard
                                    title="Total Revenue"
                                    value={stats.totalRevenue.toLocaleString()}
                                    prefix="৳"
                                    icon={<DollarSign className="h-6 w-6 text-teal-600" />}
                                />
                                <StatCard
                                    title="Today's Revenue"
                                    value={stats.todayRevenue.toLocaleString()}
                                    prefix="৳"
                                    icon={<DollarSign className="h-6 w-6 text-teal-600" />}
                                />
                                <StatCard
                                    title="Today's Check-ins"
                                    value={stats.todayCheckIns.toLocaleString()}
                                    icon={<Activity className="h-6 w-6 text-teal-600" />}
                                />
                                <StatCard
                                    title="Total Credits (All Time)"
                                    value={stats.totalAllTimeCredits.toLocaleString()}
                                    suffix=" credits"
                                    icon={<TrendingUp className="h-6 w-6 text-teal-600" />}
                                />
                            </div>
                        </TabsContent>

                        {/* The rest of the component remains the same */}
                        <TabsContent value="manage-partners" className="mt-6">
                            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 border border-slate-200/50">
                                <h2 className="text-xl font-semibold text-slate-900 mb-1">
                                    Register a New Account
                                </h2>
                                <p className="text-sm text-slate-500 mb-6">
                                    Create an `admin` (partner) or `owner` account.
                                </p>
                                <form
                                    onSubmit={handleCreatePartner}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                >
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={partnerForm.name}
                                            onChange={handlePartnerFormChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="mobile">Mobile Number</Label>
                                        <Input
                                            id="mobile"
                                            name="mobile"
                                            value={partnerForm.mobile}
                                            onChange={handlePartnerFormChange}
                                            placeholder="+8801XXXXXXXXX"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Temporary Password</Label>
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={partnerForm.password}
                                            onChange={handlePartnerFormChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="role">Account Role</Label>
                                        <Select
                                            name="role"
                                            value={partnerForm.role}
                                            onValueChange={(value) =>
                                                handlePartnerSelectChange(value, "role")
                                            }
                                            required
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="admin">
                                                    Admin (Partner)
                                                </SelectItem>
                                                <SelectItem value="owner">Owner</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="md:col-span-2">
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full md:w-auto"
                                        >
                                            {isSubmitting ? (
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            ) : (
                                                <UserPlus className="mr-2 h-4 w-4" />
                                            )}{" "}
                                            Create Account
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </TabsContent>

                        <TabsContent value="manage-gyms" className="mt-6">
                            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 border border-slate-200/50">
                                <h2 className="text-xl font-semibold text-slate-900 mb-1">
                                    List a New Gym
                                </h2>
                                <p className="text-sm text-slate-500 mb-6">
                                    Add a new gym and link it to a partner account.
                                </p>
                                <form
                                    onSubmit={handleCreateGym}
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                >
                                    <div className="space-y-2">
                                        <Label htmlFor="gymName">Gym Name</Label>
                                        <Input
                                            id="gymName"
                                            name="name"
                                            value={gymForm.name}
                                            onChange={handleGymFormChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2 lg:col-span-2">
                                        <Label htmlFor="address">Address</Label>
                                        <Input
                                            id="address"
                                            name="address"
                                            value={gymForm.address}
                                            onChange={handleGymFormChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="district">District</Label>
                                        <Input
                                            id="district"
                                            name="district"
                                            value={gymForm.district}
                                            onChange={handleGymFormChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2 lg:col-span-2">
                                        <Label htmlFor="image">Image URL</Label>
                                        <Input
                                            id="image"
                                            name="image"
                                            type="url"
                                            value={gymForm.image}
                                            onChange={handleGymFormChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="partnerId">Partner Account</Label>
                                        <Select
                                            name="partnerId"
                                            onValueChange={(value) =>
                                                handleGymSelectChange(value, "partnerId")
                                            }
                                            value={gymForm.partnerId}
                                            required
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a partner" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {partners.map((p) => (
                                                    <SelectItem key={p._id} value={p._id}>
                                                        {p.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="creditCost">Credit Cost per Check-in</Label>
                                        <Input
                                            id="creditCost"
                                            name="creditCost"
                                            type="number"
                                            min="1"
                                            step="0.5"
                                            value={gymForm.creditCost}
                                            onChange={handleGymFormChange}
                                            required
                                        />
                                    </div>
                                    <div className="lg:col-span-3">
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full md:w-auto"
                                        >
                                            {isSubmitting ? (
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            ) : (
                                                <Home className="mr-2 h-4 w-4" />
                                            )}{" "}
                                            List This Gym
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    );
}
