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
    if (!session || session.user.role !== "owner") {
        return res.status(403).json({ message: "Forbidden" });
    }

    try {
        await connectDB();

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Run database queries in parallel
        const [todayTransactions, todayCheckIns, allTimeTransactions] = await Promise.all([
            Transaction.find({
                createdAt: { $gte: today, $lt: tomorrow },
                status: "completed",
            }).lean(),
            CheckIn.countDocuments({
                timestamp: { $gte: today, $lt: tomorrow },
            }),
            // Fetch all completed transactions for total revenue
            Transaction.find({
                status: "completed",
            }).lean(),
        ]);

        const todayRevenue = todayTransactions.reduce((sum, tx) => sum + tx.amount, 0);

        const todayCredits = todayTransactions
            .filter((tx) => tx.type === "credit_earned")
            .reduce((sum, tx) => sum + tx.credits, 0);

        // Calculate total revenue from all completed transactions
        const totalRevenue = allTimeTransactions.reduce((sum, tx) => sum + tx.amount, 0);
        const totalAllTimeCredits = allTimeTransactions
            .filter((tx) => tx.type === "credit_earned")
            .reduce((sum, tx) => sum + tx.credits, 0);

        res.status(200).json({
            todayRevenue,
            todayCheckIns,
            todayCredits,
            totalAllTimeCredits,
            totalRevenue, // Add totalRevenue to the response
        });
    } catch (error) {
        console.error("Error fetching owner stats:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
