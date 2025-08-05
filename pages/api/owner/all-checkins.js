import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import connectDB from "@/lib/mongodb";
import CheckIn from "@/models/CheckIn";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const session = await getServerSession(req, res, authOptions);
    console.log("Full session object in all-checkins API:", session);

    if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    console.log("Session user role in all-checkins API:", session.user.role);

    // Allow both 'owner' and 'admin' roles to access this API
    if (session.user.role !== "owner" && session.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
    }

    try {
        await connectDB();

        // Fetch all check-ins, sorted by timestamp descending
        const allCheckIns = await CheckIn.find({}).sort({ timestamp: -1 }).lean();

        console.log("Fetched all check-ins for owner dashboard:", allCheckIns);

        return res.status(200).json({ checkIns: allCheckIns });
    } catch (error) {
        console.error("Error fetching all check-ins:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
