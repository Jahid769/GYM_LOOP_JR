import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
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
        amount: {
            type: Number,
            required: true,
            min: [0, "Amount cannot be negative"],
        },
        type: {
            type: String,
            enum: ["credit_purchase", "subscription", "credit_earned"],
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "completed", "failed"],
            default: "pending",
        },
        credits: {
            type: Number,
            required: true,
            min: [0, "Credits cannot be negative"],
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

// Prevent mongoose from creating a new model if it already exists
export default mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);
