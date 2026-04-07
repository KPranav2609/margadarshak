import express from "express";
import { getTasks, completeTask } from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getTasks);
router.post("/complete", protect, completeTask);

export default router;