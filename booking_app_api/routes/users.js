import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.js";
import { verifyAdmin, verifytoken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/checkauthentication", verifytoken, (req, res) => {
  res.send("hello user you are logged in");
});

// router.get("/checkuser/:id", verifyUser, (req, res) => {
//   res.send("hello user you are logged in and delete account");
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res) => {
//   res.send("hello Admin you are logged in and delete all account");
// });

// UPDATE

router.put("/:id", verifyUser, updateUser);

// DELETE

router.delete("/:id", verifyUser, deleteUser);

// GET

router.get("/:id", verifyUser, getUser);

// GETALL

router.get("/", verifyAdmin, getUsers);

export default router;
