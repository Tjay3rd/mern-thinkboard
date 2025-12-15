import { Router } from "express";
import {
	signUp,
	verifyEmail,
	logout,
	login,
	forgotPassword,
	resetPassword,
	checkAuth,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.get("/check-auth", verifyToken, checkAuth);
router.post("/signup", signUp);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/login", login);
router.post("/logout", logout);

export default router;
