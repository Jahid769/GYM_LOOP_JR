import mongoose from "mongoose";

const GymSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        address: {
            type: String,
            required: true,
        },
        district: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        openTime: String,
        closeTime: String,
        rating: {
            type: Number,
            default: 4.0,
        },
        partnerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        creditCost: {
            type: Number,
            required: true,
            default: 1,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Gym || mongoose.model("Gym", GymSchema);
