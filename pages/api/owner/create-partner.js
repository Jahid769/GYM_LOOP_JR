import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { createUser } from "@/lib/users";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const session = await getServerSession(req, res, authOptions);
    if (!session || session.user.role !== "owner") {
        return res.status(403).json({ message: "Forbidden: Access restricted to owners" });
    }

    try {
        // Now destructuring 'role' from the request body
        const { name, mobile, password, role } = req.body;

        if (!name || !mobile || !password || !role) {
            return res
                .status(400)
                .json({ message: "Name, mobile, password, and role are required" });
        }

        if (!["admin", "owner"].includes(role)) {
            return res.status(400).json({ message: "Invalid role specified" });
        }

        // Pass all details, including the selected role, to createUser
        const user = await createUser({ name, mobile, password, role });

        res.status(201).json({ message: "Account created successfully", user });
    } catch (error) {
        console.error("Create partner error:", error);
        res.status(400).json({ message: error.message || "Something went wrong" });
    }
}
