import express from "express";
import { newUserController, validateUserController } from "../controllers/users/index.js";

const router = express.Router();

router.post("/api/users/register", newUserController);

router.put("/api/users/validate/:registrationCode", validateUserController);

// router.post("/api/users/login", loginController);

// router.post("/api/users/password-recovery", passwordRecoveryController);

// router.get("/api/users", authMiddleware, getUsersController);

// router.get("/api/users/profile", authMiddleware, getOwnUserController);

export default router;
