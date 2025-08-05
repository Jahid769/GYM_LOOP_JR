import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import connectDB from "@/lib/mongodb";
import Gym from "@/models/Gym";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const session = await getServerSession(req, res, authOptions);
    if (!session || session.user.role !== "owner") {
        return res.status(403).json({ message: "Forbidden: Access restricted to owners" });
    }

    try {
        await connectDB();

        // Ensure all required fields are present
        const { name, address, district, image, partnerId, creditCost } = req.body;
        if (!name || !address || !district || !image || !partnerId || !creditCost) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newGym = new Gym(req.body);
        await newGym.save();

        res.status(201).json({ message: "Gym listed successfully", gym: newGym });
    } catch (error) {
        console.error("Create gym error:", error);
        // Return a generic error message to the client
        res.status(500).json({ message: "An internal server error occurred." });
    }
}
