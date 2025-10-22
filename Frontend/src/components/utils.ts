import axios from "axios";

declare global {
  interface ImportMetaEnv {
    readonly MODE: string;
    readonly VITE_API_URL?: string;
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

const BASE_URL = import.meta.env.MODE === "development" ? 'http://localhost:7000/api/notes' : 'https://api.example.com/notes';
const api = axios.create({
    baseURL: BASE_URL
});

export function formatDate (date: Date): string {
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
} 

export default api;
