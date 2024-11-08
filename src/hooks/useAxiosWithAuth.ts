import {useAuth0} from "@auth0/auth0-react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASIC_API_URL;
// init axios instance
const axiosInstance = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		// "Content-Type": "application/json",
		// "Content-Type": "multipart/form-data",
	},
});

// This function helps inject the token into request headers
export const useAxiosWithAuth = () => {
	// Interceptor request to automatically add token to headers
	const {getAccessTokenSilently} = useAuth0();
	axiosInstance.interceptors.request.use(
		async config => {
			try {
				// Get token using useAuth0's getAccessTokenSilently()
				const token = await getAccessTokenSilently();
				if (token) {
					config.headers["Authorization"] = `Bearer ${token}`; // Attach token to request headers
				}
			} catch (error) {
				console.error("Failed to fetch access token", error);
			}
			return config;
		},
		error => {
			return Promise.reject(error); // Handle request error
		},
	);

	// Interceptor response to handle global errors (401, 500, etc.)
	axiosInstance.interceptors.response.use(
		response => response,
		error => {
			if (error.response?.status === 401) {
				console.error("Unauthorized access, please login again.");
				// Redirect user or logout
			} else if (error.response?.status === 500) {
				console.error("Internal server error, please try again later.");
			}
			return Promise.reject(error);
		},
	);

	return axiosInstance; // Return the configured instance
};
