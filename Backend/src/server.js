import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import notesRoutes from "./routes/notesRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

// Define the ES Module equivalents
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 7000;

if (process.env.NODE_ENV !== "production") {
	app.use(
		cors({
			origin: "http://localhost:5173",
			credentials: true,
		})
	);
}
app.use(express.json());
app.use(cookieParser());
app.use(rateLimiter);
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../../Frontend/dist")));
	app.get(/(.*)/, (_, res) => {
		res.sendFile(path.join(__dirname, "../../Frontend", "dist", "index.html"));
	});
}

connectDB().then(() => {
	app.listen(port, () => {
		console.log("Server listening on Port:", port);
	});
});
