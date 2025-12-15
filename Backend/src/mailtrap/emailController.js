import { mailTrapClient, sender } from "./mailtrapConfig.js";
import {
	VERIFICATION_EMAIL_TEMPLATE,
	WELCOME_EMAIL_TEMPLATE,
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplates.js";

export async function sendVerificationEmail(email, verificationToken) {
	const receipient = [{ email }];
	try {
		const response = await mailTrapClient.send({
			from: sender,
			to: receipient,
			subject: "Verifying Email",
			html: VERIFICATION_EMAIL_TEMPLATE.replace(
				"{verificationCode}",
				verificationToken
			),
			category: "email Verification",
		});
		console.log("email sent successfully", response);
	} catch (error) {
		console.log("Error sending verification Email");
		throw new Error("Error sending verification email", error);
	}
}

export async function sendWelcomeEmail(email, name) {
	const receipient = [{ email }];

	try {
		await mailTrapClient.send({
			from: sender,
			to: receipient,
			subject: "Welcome email",
			html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
			category: "Welcome Email",
		});

		console.log("Email sent sucessfully");
	} catch (error) {
		console.error(error);
		throw new Error("Welcome email not send");
	}
}

export async function sendPasswordResetEmail(email, resetUrl) {
	const receipient = [{ email }];

	try {
		await mailTrapClient.send({
			from: sender,
			to: receipient,
			subject: "Reset Your Password",
			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
			category: "Password Reset",
		});

		console.log("Email sent sucessfully");
	} catch (error) {
		console.error(error);
		throw new Error("Password Reset email not send");
	}
}

export async function sendResetSuccessEmail(email) {
	const receipient = [{ email }];

	try {
		await mailTrapClient.send({
			from: sender,
			to: receipient,
			subject: "Password reset successful",
			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
			category: "Password Reset",
		});

		console.log("Email sent sucessfully");
	} catch (error) {
		console.error(error);
		throw new Error("Password Reset email not send");
	}
}
