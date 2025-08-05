import connectDB from "@/lib/mongodb";
import Gym from "@/models/Gym";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        await connectDB();
        const gyms = await Gym.find({});
        res.status(200).json({ gyms });
    } catch (error) {
        console.error("Error fetching gyms:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
