import express from "express";
import {
	newUserController,
	validateUserController,
	loginController,
	userListController,
	getOwnUserController,
	passwordRecoveryController,
} from "../controllers/users/index.js";
import { authUserMiddleware } from "../middlewares/index.js";

const router = express.Router();

router.post("/api/users/register", newUserController);

router.put("/api/users/validate/:registrationCode", validateUserController);

router.post("/api/users/login", loginController);

router.get("/api/users", authUserMiddleware, userListController);

router.get("/api/users/profile", authUserMiddleware, getOwnUserController);

router.post("/api/users/password-recovery", passwordRecoveryController);

export default router;
