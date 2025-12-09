import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
	{
		title: {
			type: mongoose.Schema.Types.String,
			required: true,
		},
		content: {
			type: mongoose.Schema.Types.String,
			required: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
	},
	{ timestamps: true }
);

export const Note = mongoose.model("Note", NoteSchema);
