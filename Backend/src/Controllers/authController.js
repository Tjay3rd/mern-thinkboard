import { User } from "../models/authSchema.js";
import crypto from "crypto";
import { generateTokenAndSetCookie } from "./jwt.js";
import {
	sendVerificationEmail,
	sendWelcomeEmail,
	sendPasswordResetEmail,
	sendResetSuccessEmail,
} from "../mailtrap/emailController.js";
import dotenv from "dotenv";

dotenv.config();

export async function checkAuth(req, res) {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user)
			return res
				.status(400)
				.json({ success: false, message: "User not found" });
		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log(error);
		res.status(400).json({ success: false, message: "Internal server error" });
	}
}

export async function signUp(req, res) {
	const { email, name, password } = req.body;
	try {
		if (!email || !name || !password) {
			throw new Error("All fields required");
		}
		const userAlreadyExists = await User.findOne({ email });
		if (userAlreadyExists) {
			return res
				.status(400)
				.json({ success: false, message: "User Already Exists" });
		}

		const verificationToken = Math.floor(
			100000 + Math.random() * 900000
		).toString();

		const Newuser = new User({
			email,
			name,
			password,
			verificationToken,
			verificationExpiresAt: Date.now() + 1000 * 60 * 60 * 24,
		});
		Newuser.save();

		generateTokenAndSetCookie(res, Newuser._id);

		await sendVerificationEmail(Newuser.email, verificationToken);

		res.status(201).json({
			success: true,
			message: "User created successfully",
			user: { ...Newuser._doc, password: undefined },
		});
	} catch (error) {
		return res.status(400).json({ success: false, message: error.message });
	}
}

export async function verifyEmail(req, res) {
	const { code } = req.body;

	try {
		const Newuser = await User.findOne({
			verificationToken: code,
			verificationExpiresAt: { $gt: Date.now() },
		});
		if (!Newuser) {
			return res.status(400).json({
				success: "false",
				message: "Invalid or expired verification code",
			});
		}
		Newuser.isVerified = true;
		Newuser.verificationToken = undefined;
		Newuser.verificationExpiresAt = undefined;

		await Newuser.save();
		await sendWelcomeEmail(Newuser.email, Newuser.name);
		res.status(200).json({
			success: true,
			message: "Verification Email sent successfully",
			user: { ...Newuser._doc, password: undefined },
		});
	} catch (error) {
		console.log(error);
		throw new Error("User could not be verified due to error:", error);
	}
}

export async function login(req, res) {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res
				.status(400)
				.json({ success: false, message: "Invalid credentials" });
		}
		const isPasswordtrue = await user.comparePassword(password);
		if (!isPasswordtrue) {
			return res
				.status(400)
				.json({ success: false, message: "Invalid credentials" });
		}
		generateTokenAndSetCookie(res, user._id);
		user.lastLogin = Date.now();
		await user.save();
		res.status(200).json({
			success: true,
			message: "User logged in successfully",
			user: { ...user._doc, password: undefined },
		});
	} catch (error) {
		console.log(error);
		res.status(500).send("Internal server Error");
	}
}

export async function logout(_, res) {
	res.clearCookie("token");
	res
		.status(200)
		.json({ success: true, message: "User logged out successfully" });
}

export async function forgotPassword(req, res) {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res
				.status(400)
				.json({ success: false, message: "User not found" });
		}
		const token = crypto.randomBytes(25).toString("hex");
		const tokenExpiry = Date.now() + 1000 * 60 * 60;

		user.resetPasswordToken = token;
		user.resetPasswordExpiresAt = tokenExpiry;

		await user.save();
		await sendPasswordResetEmail(
			user.email,
			`${process.env.CLIENT_URL}/reset-password/${token}`
		);
		res.status(200).json({
			success: true,
			message: "Password reset link sent to your email",
		});
	} catch (error) {
		console.log(error);
		res
			.status(400)
			.json({ success: false, message: "Error resetting password" });
	}
}

export async function resetPassword(req, res) {
	const { token } = req.params;
	const { password } = req.body;
	try {
		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpiresAt: { $gt: Date.now() },
		});
		if (!user) {
			return res
				.status(400)
				.json({ success: false, message: "Invalid or expired token" });
		}

		user.password = password;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpiresAt = undefined;
		await user.save();

		await sendResetSuccessEmail(user.email);
		res
			.status(200)
			.json({ success: true, message: "Password reset successfully" });
	} catch (error) {
		console.log(error);
		res
			.status(400)
			.json({ success: false, message: "Error resetting password" });
	}
}
