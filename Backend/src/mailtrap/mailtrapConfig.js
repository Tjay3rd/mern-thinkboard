import Nodemailer from "nodemailer";

export const transporter = Nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

export const sender = {
	address: process.env.EMAIL_USER,
	name: "Thinkboard Team",
};
