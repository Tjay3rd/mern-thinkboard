import { Router } from "express";
import {
	getNotes,
	getNote,
	createNote,
	updateNote,
	deleteNote,
} from "../controllers/notesController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.get("/", verifyToken, getNotes);

router.get("/:id", verifyToken, getNote);

router.post("/", verifyToken, createNote);

router.patch("/:id", verifyToken, updateNote);

router.delete("/:id", verifyToken, deleteNote);

export default router;
