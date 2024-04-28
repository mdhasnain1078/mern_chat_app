import { Router } from "express";
import protect from "../middleware/authmiddleware.js";
import { allMessages, sendMessage } from "../controllers/messageControllers.js";

const router = Router();

router.route("/:chatId").get(protect, allMessages);
router.route("/").post(protect, sendMessage);

export default router;
