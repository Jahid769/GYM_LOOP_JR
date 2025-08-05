import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        mobile: {
            type: String,
            required: [true, "Mobile number is required"],
            unique: true,
            validate: {
                validator: function (v) {
                    // Validate Bangladeshi mobile number format (+8801XXXXXXXXX)
                    return /^\+8801[3-9]\d{8}$/.test(v);
                },
                message: (props) => `${props.value} is not a valid Bangladeshi mobile number!`,
            },
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters long"],
        },
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [2, "Name must be at least 2 characters long"],
        },
        role: {
            type: String,
            enum: ["user", "admin", "owner"],
            default: "user",
        },
        credits: {
            type: Number,
            default: 0,
            min: [0, "Credits cannot be negative"],
        },
        lastCheckInAt: {
            type: Date,
            required: false,
        },
        gymId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Gym",
            required: false,
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

export default mongoose.models.User || mongoose.model("User", userSchema);
