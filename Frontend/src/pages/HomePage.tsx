/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Navbar from "../notesComponents/navbar";
import RateLimitedUI from "../notesComponents/rateLimitedUI";
import NoteCard from "../notesComponents/NoteCard";
import NotesNotFound from "../notesComponents/NotesNotFound";
import { useNoteStore } from "../store/noteStore";
import { Minus } from "lucide-react";
import { useAuthStore } from "../store/authStore";

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

const HomePage = () => {
	const [notes, setNotes] = useState<Note[]>([]);

	const { fetchNotes, isLoading, isRateLimited } = useNoteStore();

	const handlelogout = () => {
		if (!window.confirm("Are you sure you want to proceed to logging out?"))
			return;
		logout();
	};
	const { logout } = useAuthStore();

	useEffect(() => {
		fetchNotes(setNotes);
	}, []);

	return (
		<div className="relative min-h-screen">
			<Navbar />
			{isRateLimited && <RateLimitedUI />}
			<div className="overflow-y-auto">
				{isLoading && (
					<div className="text-center text-primary py-10">Loading Notes...</div>
				)}
				{notes.length > 0 && !isRateLimited ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-12 py-8">
						{notes.map((note) => (
							<NoteCard key={note._id} note={note} setNotes={setNotes} />
						))}
					</div>
				) : !isLoading && notes.length === 0 && !isRateLimited ? (
					<NotesNotFound />
				) : null}
			</div>
			<button
				onClick={handlelogout}
				className="btn btn-error mx-4 bottom-2 right-1 fixed"
			>
				<Minus className="size-5" />
				<span>Logout</span>
			</button>
		</div>
	);
};

export default HomePage;
