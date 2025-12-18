import { create } from "zustand";
import axios from "axios";

const BASE_URL =
	import.meta.env.VITE_MODE === "development"
		? "http://localhost:7000/api/auth"
		: "/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
	user: null,
	isAuthenticated: false,
	error: null,
	isLoading: false,
	isCheckingAuth: true,
	message: null,

	checkAuth: async () => {
		set({ isCheckingAuth: true, error: null });
		try {
			const response = await axios.get(`${BASE_URL}/check-auth`);
			set({
				user: response.data.user,
				isAuthenticated: true,
				isCheckingAuth: false,
			});
		} catch (error) {
			set({ error: null, isCheckingAuth: false, isAuthenticated: false });
		}
	},

	signup: async (name, email, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${BASE_URL}/signup`, {
				name,
				email,
				password,
			});
			set({
				user: response.data.user,
				isAuthenticated: true,
				isLoading: false,
			});
		} catch (error) {
			set({
				error: error.response.data.message || "Error signing up",
				isLoading: false,
			});
			throw error;
		}
	},

	verifyEmail: async (code) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${BASE_URL}/verify-email`, { code });
			set({
				user: response.data.user,
				isAuthenticated: true,
				isLoading: false,
			});
			return response.data;
		} catch (error) {
			set({
				error: error.response.data.message || "Error verifying email",
				isLoading: false,
			});
			throw error;
		}
	},

	login: async (email, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${BASE_URL}/login`, {
				email,
				password,
			});
			set({
				user: response.data.user,
				isAuthenticated: true,
				isLoading: false,
			});
		} catch (error) {
			set({
				error: error.response.data.message || "Incorrect Username or Password",
				isLoading: false,
			});
			throw error;
		}
	},

	logout: async () => {
		set({ error: null, isLoading: true });
		try {
			await axios.post(`${BASE_URL}/logout`);
			set({
				user: null,
				isAuthenticated: false,
				error: null,
				isLoading: false,
			});
		} catch (error) {
			set({ error: "Error Logging Out", isLoading: false });
		}
	},

	forgotPassword: async (email) => {
		set({ isLoading: true, error: null, message: null });
		try {
			const response = await axios.post(`${BASE_URL}/forgot-password`, {
				email,
			});
			set({ isLoding: false, message: response.data.message });
		} catch (error) {
			set({
				error:
					error.response.data.message || "Error Sending Password Reset Email",
				isLoading: false,
			});
			throw error;
		}
	},

	resetPassword: async (token, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${BASE_URL}/reset-password/${token}`, {
				password,
			});
			set({ isLoading: false, message: response.data.message });
		} catch (error) {
			set({
				error: error.response.data.message || "Error Resetting Password",
				isLoading: false,
			});
			throw error;
		}
	},
}));
