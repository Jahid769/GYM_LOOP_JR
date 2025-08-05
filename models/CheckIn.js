// models/CheckIn.js

import mongoose from "mongoose";

const checkInSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        userName: {
            type: String,
            required: true,
        },
        userMobile: {
            type: String,
            required: true,
        },
        gymId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Gym",
            required: true,
        },
        gymName: {
            type: String,
            required: true,
        },
        gymAddress: {
            type: String,
            required: true,
        },
        creditsUsed: {
            type: Number,
            required: true,
            default: 1,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.CheckIn || mongoose.model("CheckIn", checkInSchema);
