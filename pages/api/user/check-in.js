import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import CheckIn from "@/models/CheckIn";
import Gym from "@/models/Gym";
import Transaction from "@/models/Transaction";

const COOLDOWN_PERIOD_IN_MINUTES = 10;
// Use the environment variable for the credit value
const BDT_PER_CREDIT = parseFloat(process.env.NEXT_PUBLIC_BDT_PER_CREDIT) || 150;

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const dbSession = await User.startSession();
    try {
        const { gymId } = req.body;
        if (!gymId) {
            return res.status(400).json({ message: "Gym ID is required" });
        }

        await connectDB();

        let result;

        await dbSession.withTransaction(async () => {
            const gym = await Gym.findById(gymId).session(dbSession);
            if (!gym) throw new Error("Gym not found");

            const creditCost = gym.creditCost || 1;

            const user = await User.findById(session.user.id).session(dbSession);
            if (!user) throw new Error("User not found");

            if (user.lastCheckInAt) {
                const timeSinceLastCheckIn = new Date() - new Date(user.lastCheckInAt);
                const cooldownMilliseconds = COOLDOWN_PERIOD_IN_MINUTES * 60 * 1000;
                if (timeSinceLastCheckIn < cooldownMilliseconds) {
                    const minutesRemaining = Math.ceil(
                        (cooldownMilliseconds - timeSinceLastCheckIn) / 60000
                    );
                    throw new Error(
                        `You have checked in recently. Please try again in ${minutesRemaining} minutes.`
                    );
                }
            }

            if (user.credits < creditCost) {
                throw new Error(
                    `You do not have enough credits for this gym. It costs ${creditCost} credits.`
                );
            }

            user.credits -= creditCost;
            user.lastCheckInAt = new Date();
            await user.save({ session: dbSession });

            const checkInRecord = new CheckIn({
                userId: user._id,
                userName: user.name,
                userMobile: user.mobile,
                gymId: gym._id,
                gymName: gym.name,
                gymAddress: gym.address,
                creditsUsed: creditCost,
                timestamp: new Date(),
            });
            const savedCheckIn = await checkInRecord.save({ session: dbSession });

            const partner = await User.findById(gym.partnerId).session(dbSession);
            if (partner) {
                partner.credits += creditCost;
                await partner.save({ session: dbSession });

                await Transaction.create(
                    [
                        {
                            userId: partner._id,
                            userName: partner.name,
                            userMobile: partner.mobile,
                            // Use the BDT_PER_CREDIT constant
                            amount: creditCost * BDT_PER_CREDIT,
                            type: "credit_earned",
                            status: "completed",
                            credits: creditCost,
                        },
                    ],
                    { session: dbSession }
                );
            } else {
                console.error(
                    `CRITICAL: Partner not found for gymId ${gym._id}. User ${user._id} was charged, but partner was not credited.`
                );
            }

            result = {
                newCredits: user.credits,
                checkIn: savedCheckIn,
            };
        });

        await dbSession.endSession();
        res.status(200).json(result);
    } catch (error) {
        await dbSession.endSession();
        console.error("Error processing check-in:", error);
        res.status(400).json({ message: error.message || "Error processing check-in" });
    }
}
