import { Note } from "../models/noteSchema.js";
import mongoose from "mongoose";

async function getNotes(req, res) {
	try {
		const { userId } = req;
		const query = req.user.role === "admin" ? {} : { userId };
		const allnotes = await Note.find(query)
			.sort({ updatedAt: -1 })
			.populate("userId", "name role")
			.exec();
		res.status(200).json(allnotes);
	} catch (error) {
		console.error("Error in getNotes controller", error);
		res
			.status(500)
			.json({ message: "Internal server error: cannot retrieve notes" });
	}
}

async function getNote(req, res) {
	try {
		const { id } = req.params;
		const { userId } = req;
		const query = req.user.role === "admin" ? { _id: id } : { _id: id, userId };
		const note = await Note.findOne(query)
			.populate("userId", "name role")
			.exec();
		if (!note) return res.status(404).send("Note not found");
		res.status(200).json(note);
	} catch (error) {
		console.error("Error in getNote controller", error);
		res
			.status(500)
			.json({ message: "Internal server error: cannot retrieve notes" });
	}
}

async function createNote(req, res) {
	try {
		const { userId } = req;
		const { title, content } = req.body;
		const newnote = new Note({ title, content, userId });
		await newnote.save();
		res.status(201).send(`New Post, ${title}, created successfully`);
	} catch (error) {
		console.log("Error in  createNote controller", error);
		res
			.status(500)
			.json({ message: "Internal server error: cannot create note" });
	}
}

async function updateNote(req, res) {
	try {
		const {
			body: { title, content },
			params: { id },
			userId,
			user: { role },
		} = req;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(404).json({ message: "Invalid Note ID" });
		}
		let updateQuery = { _id: id };
		if (role !== "admin") {
			updateQuery.userId = userId;
		}

		const updatedNote = await Note.findByIdAndUpdate(
			updateQuery,
			{ title, content },
			{ new: true }
		);
		if (!updatedNote)
			return res.status(404).send("Note not found or unauthorized to update");
		res.status(200).send(`Post,  ${title}, updated successfully`);
	} catch (error) {
		console.error("Error in  updateNote controller", error);
		res
			.status(500)
			.json({ message: "Internal server error: cannot update note" });
	}
}

async function deleteNote(req, res) {
	try {
		const {
			params: { id },
			userId,
			user: { role },
		} = req;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(404).json({ message: "Invalid Note ID" });
		}
		let deleteQuery = { _id: id };
		if (role !== "admin") {
			deleteQuery.userId = userId;
		}

		const deleteThisNote = await Note.findByIdAndDelete(deleteQuery);
		if (!deleteThisNote)
			return res.status(404).send("Note not found or unauthorized to delete");
		res.status(200).send(`Post, deleted successfully`);
	} catch (error) {
		console.error("Error in  deleteNote controller", error);
		res
			.status(500)
			.json({ message: "Internal server error: cannot delete this note" });
	}
}

export { getNotes, getNote, createNote, updateNote, deleteNote };
