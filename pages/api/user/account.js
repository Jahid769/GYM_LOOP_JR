import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import CheckIn from "@/models/CheckIn";
import Transaction from "@/models/Transaction";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        await connectDB();

        // Get user info
        const user = await User.findById(session.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Get recent check-ins (last 5)
        const checkIns = await CheckIn.find({ userId: user._id })
            .sort({ timestamp: -1 })
            .limit(5)
            .select("gymName gymAddress timestamp");

        // Get billing history (last 5 transactions)
        const transactions = await Transaction.find({ userId: user._id })
            .sort({ createdAt: -1 })
            .limit(5)
            .select("amount type status credits createdAt");

        // Get current plan info
        const currentPlan = {
            name: "Basic Plan", // This should come from your subscription system
            credits: user.credits,
            status: "active", // This should come from your subscription system
            nextBillingDate: null, // This should come from your subscription system
        };

        res.status(200).json({
            user: {
                name: user.name,
                mobile: user.mobile,
                email: user.email,
                credits: user.credits,
                createdAt: user.createdAt,
            },
            currentPlan,
            checkIns,
            transactions,
        });
    } catch (error) {
        console.error("Error fetching user account info:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
