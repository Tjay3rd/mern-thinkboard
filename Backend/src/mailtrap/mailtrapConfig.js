import Nodemailer from "nodemailer";

export const transporter = Nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
	tls: {
		rejectUnauthorized: false,
	},
});

export const sender = {
	address: process.env.EMAIL_USER,
	name: "Thinkboard Team",
};
