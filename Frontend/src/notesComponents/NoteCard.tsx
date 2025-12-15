import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "./utils";
import { useNoteStore } from "../store/noteStore";
import type { Dispatch, SetStateAction, MouseEvent } from "react";

interface Note {
	_id: string;
	title: string;
	content: string;
	createdAt: string;
	updatedAt: string;
	userId: {
		name: string;
	};
}

interface Props {
	note: Note;
	setNotes: Dispatch<SetStateAction<Note[]>>;
}

function NoteCard({ note, setNotes }: Props) {
	const { deleteNotecard } = useNoteStore();

	const handleDelete = async (e: MouseEvent<HTMLButtonElement>, id: string) => {
		e.preventDefault();

		if (!window.confirm("Are you sure you want to delete this note")) return;

		deleteNotecard(id, setNotes);
	};

	const dateCreated = formatDate(new Date(note.createdAt));
	const dateUpdated = formatDate(new Date(note.updatedAt));
	return (
		<Link
			to={`/note/${note._id}`}
			className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF90]"
		>
			<div className="card-body">
				<h3 className="card-title text-base-content">{note.title}</h3>
				<p className="text-base-content/70 line-clamp-2">{note.content}</p>
				<div className="card-actions justify-between items-center mt-6 ">
					<span className="text-sm text-base-content/60">
						{note.createdAt === note.updatedAt ? (
							<p> {dateCreated}</p>
						) : (
							<p>Updated: {dateUpdated}</p>
						)}
						Author: {note.userId.name}
					</span>
					<div className="flex items-center gap-1">
						<button className="btn btn-ghost btn-xs">
							<PenSquareIcon className="size-6" />
						</button>
						<button
							onClick={(e) => handleDelete(e, note._id)}
							className="btn btn-ghost btn-xs text-error"
						>
							<Trash2Icon className="size-6" />
						</button>
					</div>
				</div>
			</div>
		</Link>
	);
}

export default NoteCard;
