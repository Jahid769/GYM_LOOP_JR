import { createUser } from "../../../lib/users";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { email, password, name } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await createUser({ email, password, name });
        res.status(201).json(user);
    } catch (error) {
        if (error.message === "User already exists") {
            return res.status(409).json({ message: error.message });
        }
        console.error("Registration error:", error);
        res.status(500).json({ message: "Error creating user" });
    }
}
