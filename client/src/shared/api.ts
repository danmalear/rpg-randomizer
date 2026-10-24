import axios from 'axios';

export const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL;

if (!serverBaseUrl) {
	throw Error('Server configuration not defined.');
}

const api = axios.create({
	baseURL: `${serverBaseUrl}`,
});

export default api;
