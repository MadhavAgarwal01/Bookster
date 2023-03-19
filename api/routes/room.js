import express from "express";
import { createRoom, deleteRoom, getAllRooms, getRoom, getRoomType, updateRoom, updateRoomAvailability } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

// CREATE
router.post("/:hotelid", verifyAdmin, createRoom);

// UPDATE
router.put("/:id", verifyAdmin, updateRoom);
router.put("/availability/:id", updateRoomAvailability);

// DELETE
router.delete("/:hotelid/:id", verifyAdmin, deleteRoom);

// GET 
router.get("/:id", getRoom);

// GET room type
router.get("/type/:roomNumberID", getRoomType);

// GET ALL
router.get("/", getAllRooms);

export default router;