import axios from "axios";

declare global {
	interface ImportMetaEnv {
		readonly VITE_MODE: string;
		readonly BASE_URL: string;
	}
	interface ImportMeta {
		readonly env: ImportMetaEnv;
	}
}

const BASE_URL =
	import.meta.env.VITE_MODE === "development"
		? "http://localhost:7000/api/notes"
		: "/api/notes";
const api = axios.create({
	baseURL: BASE_URL,
});

export const formatDate = (dateString: Date): string => {
	const date = new Date(dateString);
	if (isNaN(date.getTime())) return "Invalid Date";

	return date.toLocaleString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	});
};

export default api;
