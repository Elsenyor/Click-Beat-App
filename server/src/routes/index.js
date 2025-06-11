import express from "express";
import userRoutes from "./userRoutes.js";
import trackRoutes from "./trackRoutes.js";

const router = express.Router();

router.use(userRoutes);
router.use(trackRoutes);

export default router;
