import express from "express";
import { createBooking, deleteBooking, getAllBookings, getBooking } from "../controllers/Booking.js";
import { verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/:id", verifyUser, createBooking);

// DELETE
router.delete("/:id/:bookingID", verifyUser, deleteBooking);

// GET
router.get("/:id/:bookingID", verifyUser, getBooking);

// GET ALL
router.get("/:id", verifyUser, getAllBookings);

export default router;