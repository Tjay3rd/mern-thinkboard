import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../notesComponents/navbar";
import RateLimitedUI from "../notesComponents/rateLimitedUI";
import api from "../notesComponents/utils";
import toast from "react-hot-toast";
import NoteCard from "../notesComponents/NoteCard";
import NotesNotFound from "../notesComponents/NotesNotFound";
import { useAuthStore } from "../store/authStore";

interface Note {
	_id: string;
	title: string;
	content: string;
	createdAt: string;
}

const HomePage = () => {
	const [isRateLimited, setIsRateLimited] = useState(false);
	const [notes, setNotes] = useState<Note[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const { logout } = useAuthStore();

	const handleLogout = async () => {
		await logout();
	};

	useEffect(() => {
		const fetchNotes = async () => {
			try {
				const response = await api.get<Note[]>("/");
				setNotes(response.data);
				setIsRateLimited(false);
				console.log(response);
			} catch (error) {
				console.error("Error fetching notes:", error);
				if (axios.isAxiosError(error) && error.response?.status === 429) {
					setIsRateLimited(true);
				} else {
					toast.error("Failed to load notes");
				}
			} finally {
				setIsLoading(false);
			}
		};

		fetchNotes();
	}, []);

	return (
		<div className="relative min-h-screen">
			<Navbar>
				<button onClick={handleLogout} className="btn btn-error">
					Logout
				</button>
			</Navbar>
			{isRateLimited && <RateLimitedUI />}
			<div>
				{isLoading && (
					<div className="text-center text-primary py-10">Loading Notes...</div>
				)}
				{notes.length > 0 && !isRateLimited ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-24 py-8">
						{notes.map((note) => (
							<NoteCard key={note._id} note={note} setNotes={setNotes} />
						))}
					</div>
				) : !isLoading && notes.length === 0 && !isRateLimited ? (
					<NotesNotFound />
				) : null}
			</div>
		</div>
	);
};

export default HomePage;
