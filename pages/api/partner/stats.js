// pages/api/partner/stats.js

import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import connectDB from "@/lib/mongodb";
import CheckIn from "@/models/CheckIn";
import Transaction from "@/models/Transaction";
import User from "@/models/User";
import Gym from "@/models/Gym";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const session = await getServerSession(req, res, authOptions);
    if (!session || session.user.role !== "admin") {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        await connectDB();

        // Get current month's start and end dates
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        const partner = await User.findById(session.user.id).lean();
        if (!partner || partner.role !== "admin") {
            return res.status(403).json({ message: "Forbidden" });
        }

        // Find ALL gyms associated with the partner
        const partnerGyms = await Gym.find({ partnerId: partner._id });
        if (!partnerGyms || partnerGyms.length === 0) {
            // If a partner has no gyms yet, return empty stats
            return res.status(200).json({
                monthlyStats: { checkIns: 0, payout: 0 },
                payoutHistory: [],
                recentCheckIns: [],
            });
        }

        // Create an array of all their gym IDs for querying
        const partnerGymIds = partnerGyms.map((gym) => gym._id);

        // Use the array of gym IDs to find all check-ins for the month
        const monthlyCheckIns = await CheckIn.countDocuments({
            gymId: { $in: partnerGymIds },
            timestamp: { $gte: startOfMonth, $lte: endOfMonth },
        });

        // This query correctly aggregates all transactions for the partner
        const monthlyEarnedCredits = await Transaction.aggregate([
            {
                $match: {
                    userId: partner._id,
                    type: "credit_earned",
                    status: "completed",
                    createdAt: { $gte: startOfMonth, $lte: endOfMonth },
                },
            },
            {
                $group: { _id: null, totalCredits: { $sum: "$credits" } },
            },
        ]);
        const monthlyPayout =
            monthlyEarnedCredits.length > 0 ? monthlyEarnedCredits[0].totalCredits : 0;

        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        const payoutHistoryAgg = await Transaction.aggregate([
            {
                $match: {
                    userId: partner._id,
                    type: "credit_earned",
                    status: "completed",
                    createdAt: { $gte: sixMonthsAgo },
                },
            },
            {
                $group: {
                    _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
                    payout: { $sum: "$credits" }, // 'payout' here means credits
                },
            },
            { $sort: { "_id.year": -1, "_id.month": -1 } },
            { $project: { _id: 0, year: "$_id.year", month: "$_id.month", payout: "$payout" } },
        ]);

        const formattedPayoutHistory = payoutHistoryAgg.map((stat) => ({
            month: new Date(stat.year, stat.month - 1).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
            }),
            checkIns: 0, // Placeholder as this would require a more complex query
            payout: stat.payout,
        }));

        // Use the array of gym IDs to find all recent check-ins
        const recentCheckIns = await CheckIn.find({ gymId: { $in: partnerGymIds } })
            .sort({ timestamp: -1 })
            .limit(10)
            .lean();

        // Map the correct creditsUsed value
        const recentCheckInsWithEarnings = recentCheckIns.map((checkIn) => ({
            ...checkIn,
            earnedCredit: checkIn.creditsUsed || 1, // Use the saved value, default to 1 as a fallback
        }));

        return res.status(200).json({
            monthlyStats: {
                checkIns: monthlyCheckIns,
                payout: monthlyPayout,
            },
            payoutHistory: formattedPayoutHistory,
            recentCheckIns: recentCheckInsWithEarnings,
        });
    } catch (error) {
        console.error("Error fetching partner stats:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
