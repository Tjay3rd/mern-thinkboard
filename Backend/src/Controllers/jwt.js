import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function generateTokenAndSetCookie(res, userId) {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
		expiresIn: "7d",
	});

	res.cookie("token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 1000 * 60 * 60 * 24 * 7,
	});

	return token;
}
