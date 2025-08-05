import { createUser } from "@/lib/users";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { name, mobile, password } = req.body;

        // Validate required fields
        if (!name || !mobile || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Validate mobile number format
        if (!/^\+8801[3-9]\d{8}$/.test(mobile)) {
            return res.status(400).json({ message: "Invalid mobile number format" });
        }

        // Validate password length
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }

        const user = await createUser({ name, mobile, password });
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(400).json({ message: error.message || "Something went wrong" });
    }
}
