import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

export const mailTrapClient = new MailtrapClient({
	endpoint: process.env.MAILTRAP_ENDPOINT,
	token: process.env.MAILTRAP_TOKEN,
});

export const sender = {
	email: "mailtrap@demomailtrap.com",
	name: "Thinkboard Team",
};
const receipients = [{ email }];

client
	.send({
		from: sender,
		to: receipients,
		subject: "You are really awesome bud",
		html: "",
		category: "Integration Test",
	})
	.then(console.error(error));
