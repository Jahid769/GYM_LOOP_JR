// insertGym.js

// --- START OF MODIFICATION ---
// We are explicitly telling dotenv where to find your .env.local file.
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
// --- END OF MODIFICATION ---

import mongoose from "mongoose";
import connectDB from "./lib/mongodb.js";
import Gym from "./models/Gym.js";
import User from "./models/User.js";

async function insertGym() {
    try {
        await connectDB();
        console.log("Database connected successfully.");

        // 1. Find an existing admin user to be the partnerId
        const adminUser = await User.findOne({ role: "admin" });

        if (!adminUser) {
            console.error("Error: No admin user found.");
            console.error(
                "Please create an admin user first. You can do this by signing up a new user, then manually changing their 'role' to 'admin' in your MongoDB database."
            );
            return;
        }

        console.log(`Found admin user: ${adminUser.name} (ID: ${adminUser._id})`);

        // 2. Define the new gym data
        const newGymData = {
            name: "FITNESS PLUS",
            address: "Level 5, House 7A, Road 41, Gulshan 2, Dhaka-1212",
            district: "Dhaka",
            partnerId: adminUser._id, // This should be gymId in the User model later
            image: "https://images.unsplash.com/photo-1593079831901-447551065166?q=80&w=2070",
            rating: 4.9,
            openTime: "06:00 AM",
            closeTime: "11:59 PM",
        };

        // Let's create the gym first
        const gym = await Gym.findOneAndUpdate(
            { name: newGymData.name },
            newGymData,
            { upsert: true, new: true } // Creates the gym if it doesn't exist
        );

        console.log("Successfully created or found gym:", gym);

        // 3. Now, link this gym to the admin user
        adminUser.gymId = gym._id;
        await adminUser.save();

        console.log(`Successfully linked gym ${gym.name} to partner ${adminUser.name}.`);
    } catch (error) {
        console.error("An error occurred while inserting gym data:", error.message);
        console.error("Full error details:", error);
    } finally {
        if (mongoose.connection.readyState === 1) {
            await mongoose.connection.close();
            console.log("Database connection closed.");
        }
    }
}

insertGym();
