import express, { Router } from "express";
import {
	getNotes,
	getNote,
	createNote,
	updateNote,
	deleteNote,
} from "../controllers/notesController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const app = express();
const router = Router();

app.use(express.json());

router.get("/", verifyToken, getNotes);

router.get("/:id", verifyToken, getNote);

router.post("/", verifyToken, createNote);

router.patch("/:id", updateNote);

router.delete("/:id", verifyToken, deleteNote);

export default router;
