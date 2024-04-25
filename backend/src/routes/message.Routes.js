import { Router } from "express";
import { protect } from "../../middleware/authMiddleware.js";
import { allMessages, sendMessage } from "../controllers/messageControllers";

const router = Router();

router.route("/:chatId").get(protect, allMessages);
router.route("/").post(protect, sendMessage);

export default router;
