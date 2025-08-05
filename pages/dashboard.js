import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Dumbbell, Clock, CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

// Removed Mock data - this dashboard only handles redirection
// const DISTRICTS = [
//     "Dhaka",
//     "Chittagong",
//     "Rajshahi",
//     "Khulna",
//     "Barishal",
//     "Sylhet",
//     "Rangpur",
//     "Mymensingh",
//     "Gazipur",
//     "Narayanganj",
// ];

// const MOCK_GYMS = [
//     {
//         id: 1,
//         name: "FitLife Gym",
//         district: "Dhaka",
//         address: "House 123, Road 12, Banani",
//         rating: 4.5,
//         openTime: "06:00",
//         closeTime: "22:00",
//         amenities: ["24/7 Access", "Personal Trainer", "Sauna", "Parking"],
//         image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070",
//     },
//     {
//         id: 2,
//         name: "PowerHouse Fitness",
//         district: "Dhaka",
//         address: "Plot 45, Gulshan 2",
//         rating: 4.8,
//         openTime: "05:00",
//         closeTime: "23:00",
//         amenities: ["Swimming Pool", "Group Classes", "Café", "Locker Room"],
//         image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?q=80&w=2070",
//     },
//     // Add more mock gyms as needed
// ];

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    // Removed states related to gyms as this page only redirects
    // const [selectedDistrict, setSelectedDistrict] = useState("");
    // const [searchQuery, setSearchQuery] = useState("");
    // const [filteredGyms, setFilteredGyms] = useState([]);
    // const [selectedGym, setSelectedGym] = useState(null);
    // const [isCheckingIn, setIsCheckingIn] = useState(false);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        } else if (status === "authenticated") {
            // Redirect based on user role
            if (session?.user?.role === "admin") {
                router.push("/dashboard/admin");
            } else if (session?.user?.role === "owner") {
                router.push("/dashboard/owner");
            } else {
                router.push("/dashboard/user");
            }
        }
    }, [status, session, router]);

    // Removed useEffect for filtering and handleCheckIn as they are not used here
    // useEffect(() => {
    //     if (selectedDistrict) {
    //         const filtered = MOCK_GYMS.filter(
    //             (gym) =>
    //                 gym.district.toLowerCase() === selectedDistrict.toLowerCase() &&
    //                 gym.name.toLowerCase().includes(searchQuery.toLowerCase())
    //         );
    //         setFilteredGyms(filtered);
    //     } else {
    //         setFilteredGyms([]);
    //     }
    // }, [selectedDistrict, searchQuery]);

    // const handleCheckIn = async (gymId) => {
    //     try {
    //         setIsCheckingIn(true);
    //         // TODO: Implement actual check-in logic
    //         await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
    //         setSelectedGym(gymId);
    //     } catch (error) {
    //         console.error("Check-in failed:", error);
    //     } finally {
    //         setIsCheckingIn(false);
    //     }
    // };

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    return null; // This page only handles redirection
}
