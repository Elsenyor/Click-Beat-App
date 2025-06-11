import express from "express";
import { authUserMiddleware } from "../middlewares/index.js";
import { newTrackController } from "../controllers/tracks/index.js";

const router = express.Router();

router.post("/api/tracks/create", authUserMiddleware, newTrackController);

export default router;
