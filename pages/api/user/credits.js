import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

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
        const user = await User.findById(session.user.id).select("credits");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ credits: user.credits });
    } catch (error) {
        console.error("Error fetching user credits:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
