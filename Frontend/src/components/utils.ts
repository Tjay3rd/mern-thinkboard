import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:7000/api/notes'
});

export function formatDate (date) {
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
} 

export default api;
