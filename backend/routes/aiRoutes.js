import express from "express";

import {
  placementCoach,
  studyPlanner,
  companyPreparation,
  revisionGenerator,
  practiceGenerator,
} from "../controllers/aiController.js";

import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

// Placement Coach
router.post("/placement-coach", protect, placementCoach);

// Study Planner
router.post("/study-planner", protect, studyPlanner);

router.post("/company-prep", protect, companyPreparation);

router.post("/revision", protect, revisionGenerator);

router.post("/practice",protect,practiceGenerator);

export default router;