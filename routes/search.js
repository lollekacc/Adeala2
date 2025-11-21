import express from "express";
import { searchPlans } from "../controllers/searchController.js";

const router = express.Router();

router.post("/", searchPlans);   // using POST since your controller expects req.body

export default router;
