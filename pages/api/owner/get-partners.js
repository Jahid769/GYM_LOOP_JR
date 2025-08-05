import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

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
        const partners = await User.find({ role: "admin" }).select("name _id");
        res.status(200).json({ partners });
    } catch (error) {
        console.error("Get partners error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
