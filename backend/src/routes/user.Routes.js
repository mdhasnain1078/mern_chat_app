import { Router } from "express";
import protect from "../middleware/authmiddleware.js";
import {
  registerUser,
  authUser,
  allUsers,
} from "../controllers/userControllers.js";

const router = Router();

router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);

export default router;
