import {useAuth0} from "@auth0/auth0-react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASIC_API_URL;
// Tạo axios instance
const axiosInstance = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Hàm này giúp inject token vào request headers
export const useAxiosWithAuth = () => {
	// Interceptor request để tự động thêm token vào headers'
	const {getAccessTokenSilently} = useAuth0();
	axiosInstance.interceptors.request.use(
		async config => {
			try {
				// Lấy token bằng useAuth0's getAccessTokenSilently()
				const token = await getAccessTokenSilently();
				if (token) {
					config.headers["Authorization"] = `Bearer ${token}`; // Gắn token vào request headers
				}
			} catch (error) {
				console.error("Failed to fetch access token", error);
			}
			return config;
		},
		error => {
			return Promise.reject(error); // Xử lý lỗi request
		},
	);

	// Interceptor response để xử lý lỗi toàn cục (401, 500, v.v.)
	axiosInstance.interceptors.response.use(
		response => response,
		error => {
			if (error.response?.status === 401) {
				console.error("Unauthorized access, please login again.");
				// Điều hướng người dùng hoặc logout
			} else if (error.response?.status === 500) {
				console.error("Internal server error, please try again later.");
			}
			return Promise.reject(error);
		},
	);

	return axiosInstance; // Trả về instance đã được cấu hình
};
