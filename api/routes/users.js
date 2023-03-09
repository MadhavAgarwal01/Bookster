import express from "express";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

router.get("/checkauthentication", verifyToken, (req, res, next) => {
    console.log("hello user, you are logged in")
    res.send("hello user, you are logged in")
})

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     console.log("Hello User, you are logged in and you can delete your account");
//     res.send("Hello User, you are logged in and you can delete your account");
// });
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     console.log("Hello User, you are logged in and you can delete all account");
//     res.send("Hello User, you are logged in and you can delete all account");
// });

// UPDATE
router.put("/:id", verifyUser, updateUser);

// DELETE
router.delete("/:id", verifyUser, deleteUser);

// GET
router.get("/:id", verifyUser, getUser);

// GET ALL
router.get("/", verifyAdmin, getAllUsers);

export default router;