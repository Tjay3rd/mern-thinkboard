import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL =
	import.meta.env.VITE_MODE === "development"
		? "http://localhost:7000/api/notes"
		: "/api/notes";

axios.defaults.withCredentials = true;
export const useNoteStore = create((set) => ({
	isLoading: false,
	isRateLimited: false,

	fetchNotes: async (setNotes) => {
		try {
			const response = await axios.get(`${BASE_URL}/`);
			setNotes(response.data);
			set({ isRateLimited: false });
		} catch (error) {
			console.error("Error fetching notes:", error);
			if (axios.isAxiosError(error) && error.response?.status === 429) {
				set({ isRateLimited: true });
			} else {
				toast.error("Failed to load notes");
			}
		} finally {
			set({ isLoading: false });
		}
	},

	fetchNote: async (id, setNote) => {
		set({ isLoading: true });
		try {
			const res = await axios.get(`${BASE_URL}/${id}`);
			setNote(res.data);
		} catch (error) {
			toast.error("Couldn't fetch note");
			console.error("Error fetching note:", error);
		} finally {
			set({ isLoading: false });
		}
	},

	createNote: async (title, content, navigate) => {
		set({ isLoading: true });
		try {
			await axios.post(`${BASE_URL}/`, {
				title,
				content,
			});
			toast.success("Note created successfully");
			navigate("/");
		} catch (error) {
			console.error("Error creating note:", error);
			toast.error("Failed to create note!");
		} finally {
			set({ isLoading: false });
		}
	},

	updateNote: async (id, note, navigate) => {
		try {
			await axios.patch(`${BASE_URL}/${id}`, note);
			toast.success("Note Updated successfully");
			navigate("/");
		} catch (error) {
			toast.error("Failed to save note");
			console.error("Error saving note", error);
		}
	},

	deleteNote: async (id, navigate) => {
		try {
			await axios.delete(`${BASE_URL}/${id}`);
			toast.success("Note deleted successfully");
			navigate("/");
		} catch (error) {
			console.error("Failed to delete note:", error);
			toast.error("Failed to delete note!");
		}
	},

	deleteNotecard: async (id, setNotes) => {
		try {
			await axios.delete(`${BASE_URL}/${id}`);
			setNotes((prev) => prev.filter((note) => note._id !== id));
			toast.success("Note deleted successfully");
		} catch (error) {
			console.error("Failed to delete note:", error);
			toast.error("Failed to delete note!");
		}
	},
}));
