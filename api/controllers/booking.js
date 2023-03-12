import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import Booking from "../models/Booking.js";
import createError from "../utils/error.js";

export const createBooking = async (req, res, next) => {
    const newbooking = new Booking(req.body);
    const selectedRooms = newbooking.roomId;
    console.log("Request: ", req.data)

    try {
        const savedBooking = await newbooking.save();
        console.log("Saved Booking: ", savedBooking);

        await Promise.all(
            selectedRooms.map(async (roomId) => {
                await Room.updateOne(
                    { "roomNumbers._id": roomId },
                    { $push: { "roomNumbers.$.unavailableDates": req.body.date } },
                );
                // console.log("Updated for roomID: ", roomId)
            })
        );
        res.status(200).json("Booking Successfull");

    } catch (err) {
        console.log("Booking err: ", err.message);
        if (err.message.includes("MongoServerError: E11000 duplicate key error collection")) {
            return next(createError(500, "Duplicate mongoDB keys in database"));
        } else {
            next(err);
        }
    }
};

export const deleteBooking = async (req, res, next) => {
    const bookingID = req.params.bookingID;
    console.log("bookingID: ", bookingID)
    try {
        const booking = await Booking.findById(bookingID);
        console.log("Booking to be deleted :", booking);
        await Booking.findByIdAndDelete(bookingID);

        await Promise.all(
            booking.roomId.map(async (roomId) => {
                await Room.updateOne(
                    { "roomNumbers._id": roomId },
                    { $pull: { "roomNumbers.$.unavailableDates": { $in: booking.date } } },
                );
                console.log("Updated for roomID: ", roomId)
            })
        );
        res.status(200).json("Booking deleted successfully");

    } catch (err) {
        console.log("Booking err: ", err);
        next(err);
    }
};

export const getBooking = async (req, res, next) => {
    const bookingID = req.params.bookingID;
    console.log("bookingID: ", bookingID)
    try {
        const booking = await Booking.findById(bookingID);
        res.status(200).json(booking);
    } catch (err) {
        next(err);
    }
};

export const getAllBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (err) {
        next(err);
    }
};

