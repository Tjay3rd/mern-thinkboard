import { useState, useEffect, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, LoaderIcon, Trash2Icon } from "lucide-react";
import api from "../notesComponents/utils";
import toast from "react-hot-toast";

interface Note {
	_id: string;
	title: string;
	content: string;
	createdAt: string;
}

function NoteDetailPage() {
	const [note, setNote] = useState<Note>({
		_id: "",
		title: "",
		content: "",
		createdAt: "",
	});
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);

	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		const fetchNote = async () => {
			try {
				const res = await api.get<Note>(`/${id}`);
				setNote(res.data);
			} catch (error) {
				toast.error("Couldn't fetch note");
				console.error("Error fetching note:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchNote();
	}, [id]);

	if (loading) {
		return (
			<div className="min-h-screen bg-200 flex items-center justify-center">
				<LoaderIcon className="animate-spin size-10" />
			</div>
		);
	}

	const handleSave = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!note.title.trim() || !note.content.trim()) {
			toast.error("All fields are required");
			return;
		}
		setSaving(true);
		try {
			await api.patch(`/${id}`, note);
			toast.success("Note Updated successfully");
			navigate("/");
		} catch (error) {
			toast.error("Failed to save note");
			console.error("Error saving note", error);
		} finally {
			setSaving(false);
		}
	};

	const handleDelete = async () => {
		if (!window.confirm("Are you sure you want to delete this note")) return;

		try {
			await api.delete(`/${id}`);
			toast.success("Note deleted successfully");
			navigate("/");
		} catch (error) {
			console.error("Failed to delete note:", error);
			toast.error("Failed to delete note!");
		}
	};

	return (
		<div>
			<div className="container mx-auto px-4 py-8">
				<div className="max-w-2xl mx-auto">
					<div className="flex justify-between items-center mb-6">
						<Link to={"/"} className="btn btn-ghost">
							<ArrowLeft className="size-5" />
							Back to notes
						</Link>
						<button
							className="btn btn-error btn-outline"
							onClick={handleDelete}
						>
							<Trash2Icon />
							<span>Delete Note</span>
						</button>
					</div>
					<div className="card bg-base-100">
						<div className="card-body">
							<h2 className="update-title text-2xl mb-4">Update Note</h2>
							<form id="create-form" onSubmit={handleSave}>
								<fieldset className="field flex flex-col gap-1 mb-4">
									<input
										type="text"
										placeholder="Note Title"
										className="input input-bordered w-full"
										value={note.title}
										onChange={(e) =>
											setNote({ ...note, title: e.target.value })
										}
									/>
								</fieldset>
								<fieldset className="field flex flex-col gap-1 mb-4">
									<textarea
										placeholder="Note Content"
										className="textarea textarea-bordered w-full"
										value={note.content}
										onChange={(e) =>
											setNote({ ...note, content: e.target.value })
										}
									/>
								</fieldset>
								<div className="card-actions justify-end">
									<button
										type="submit"
										className="btn btn-primary"
										disabled={saving}
									>
										{saving ? "Saving..." : "Save Changes"}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default NoteDetailPage;
