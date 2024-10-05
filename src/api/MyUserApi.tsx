import {useAuth0} from "@auth0/auth0-react";
import axios from "axios";
import {useMutation} from "react-query";
import {Bounce, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = import.meta.env.VITE_BASIC_API_URL;

// Axios instance with interceptors
const axiosInstance = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Request interceptor: Attach token to request
// axiosInstance.interceptors.request.use(
// 	async config => {
// 		const {getAccessTokenSilently} = useAuth0();
// 		const token = await getAccessTokenSilently();

// 		if (token) {
// 			config.headers["Authorization"] = `Bearer ${token}`;
// 		}

// 		return config;
// 	},
// 	error => {
// 		return Promise.reject(error);
// 	},
// );

// Response interceptor: Handle responses globally
axiosInstance.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		// Handle errors globally
		if (error.response?.status === 401) {
			toast.error("Unauthorized! Please log in again.");
		} else if (error.response?.status === 500) {
			toast.error("Server error! Please try again later.");
		}
		return Promise.reject(error);
	},
);

type CreateUserRequest = {
	auth0Id: string;
	email: string;
};

// Hook to create user
export const useCreateUser = () => {
	const {getAccessTokenSilently} = useAuth0();
	const createMyUserRequest = async (user: CreateUserRequest) => {
		const token = await getAccessTokenSilently();
		await axiosInstance.post("/api/my/user", user, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	};

	const {
		mutateAsync: createUser,
		isLoading,
		isError,
		isSuccess,
	} = useMutation(createMyUserRequest);

	return {createUser, isLoading, isError, isSuccess};
};

type UpdateUserRequest = {
	name: string;
	addressLine1: string;
	city: string;
	country: string;
};

// Hook to update user
export const useUpdateMyUser = () => {
	const {getAccessTokenSilently} = useAuth0();

	const updateMyUserRequest = async (formData: UpdateUserRequest) => {
		const token = await getAccessTokenSilently();
		const response = await axiosInstance.put("/api/my/user", formData, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (response.status !== 200) {
			throw new Error("Failed to update user");
		}
		return response.data;
	};

	const {
		mutateAsync: updateUser,
		isLoading,
		reset,
	} = useMutation(updateMyUserRequest, {
		onSuccess: () => {
			toast.success("User profile updated!", {
				position: "top-right",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
				transition: Bounce,
			});
		},
		onError: error => {
			toast.error("Error updating user profile");
			console.log(error);
			reset();
		},
	});

	return {updateUser, isLoading};
};
