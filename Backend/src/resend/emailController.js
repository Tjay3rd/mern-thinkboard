import { Resend } from "resend";
import {
	VERIFICATION_EMAIL_TEMPLATE,
	WELCOME_EMAIL_TEMPLATE,
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplates.js";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(userEmail, verificationToken) {
	try {
		const { data, error } = await resend.emails.send({
			from: `Thinkboard Team - <noreply@${process.env.EMAIL_FROM}>`,
			to: [userEmail],
			subject: "Verifying Email",
			html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
		});

		if (error) throw new Error("Error sending verification email", error);

		console.log("email sent successfully", data);
	} catch (error) {
		console.error("Error sending verification email", error);
		return { error: true, message: error.message };
	}
}

export async function sendWelcomeEmail(userEmail, name) {
	try {
		const { data, error } = await resend.emails.send({
			from: `Thinkboard Team - <noreply@${process.env.EMAIL_FROM}>`,
			to: [userEmail],
			subject: "Welcome email",
			html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
		});

		if (error) throw new Error("Error sending welcome email", error);

		console.log("Email sent sucessfully", data);
	} catch (error) {
		console.error("Error sending welcome email", error);
		return { error: true, message: error.message };
	}
}

export async function sendPasswordResetEmail(userEmail, resetUrl) {
	const receipient = email;

	try {
		const { data, error } = await resend.emails.send({
			from: `Thinkboard Team - <noreply@${process.env.EMAIL_FROM}>`,
			to: [userEmail],
			subject: "Reset Your Password",
			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
		});

		if (error) throw new Error("Error sending password reset email", error);

		console.log("Email sent sucessfully", data);
	} catch (error) {
		console.error("Error sending password reset email error", error);
		throw new Error("Password Reset email not send");
	}
}

export async function sendResetSuccessEmail(userEmail) {
	try {
		const { data, error } = await resend.emails.send({
			from: `Thinkboard Team - <noreply@${process.env.EMAIL_FROM}>`,
			to: [userEmail],
			subject: "Password reset successful",
			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
		});

		if (error) throw new Error("Error sending password reset success email", error);

		console.log("Email sent sucessfully", data);
	} catch (error) {
		console.error("Error sending password reset successful email", error);
		throw new Error("Password Reset Success email not send");
	}
}
