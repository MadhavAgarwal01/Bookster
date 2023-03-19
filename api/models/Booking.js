import mongoose from "mongoose";
const BookingSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        hotelId: {
            type: String,
            required: true,
        },
        date: {
            type: [Date],
            required: true
        },
        roomId: {
            type: [String],
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);

export default mongoose.model("Booking", BookingSchema);