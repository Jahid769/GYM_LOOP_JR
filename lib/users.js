import { hash, compare } from "bcryptjs";
import connectDB from "./mongodb";
import User from "@/models/User";

export async function getUserByMobile(mobile) {
    await connectDB();
    return User.findOne({ mobile });
}

// --- UPDATED createUser FUNCTION ---
export async function createUser({ name, mobile, password, role = "user" }) {
    await connectDB();

    const existingUser = await User.findOne({ mobile });
    if (existingUser) {
        throw new Error("User with this mobile number already exists");
    }

    const hashedPassword = await hash(password, 12);

    const newUser = new User({
        name,
        mobile,
        password: hashedPassword,
        role, // Use the role provided, or default to 'user'
    });

    await newUser.save();

    // Return the plain user object without the password
    const { password: _, ...userWithoutPassword } = newUser.toObject();
    return userWithoutPassword;
}

export async function verifyPassword(plainPassword, hashedPassword) {
    return compare(plainPassword, hashedPassword);
}
