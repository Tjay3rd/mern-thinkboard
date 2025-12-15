import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/authSchema.js";

dotenv.config();

export async function verifyToken(req, res, next) {
	const token = req.cookies.token;
	if (!token)
		return res
			.status(401)
			.json({ success: false, message: "Unauthorized - Token Not Found" });
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

		req.userId = decoded.userId;

		const user = await User.findById(decoded.userId).select("-password");
		req.user = user;

		next();
	} catch (error) {
		console.log(error);
		return res
			.status(401)
			.json({ success: false, message: "Error: Unauthorized" });
	}
}
