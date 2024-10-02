import {useAuth0} from "@auth0/auth0-react";
import axios from "axios";
import {useMutation} from "react-query";
import {Bounce, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = import.meta.env.VITE_BASIC_API_URL;

type CreateUserRequest = {
	auth0Id: string;
	email: string;
};

// Hook to create user
export const useCreateUser = () => {
	const {getAccessTokenSilently} = useAuth0();

	const createMyUserRequest = async (user: CreateUserRequest) => {
		const accessToken = await getAccessTokenSilently();
		axios
			.post(`${API_BASE_URL}/api/my/user`, user, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
					"Content-Type": "application/json",
				},
			})
			.catch(function (error) {
				// handle error
				console.log(error);
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
		const accessToken = await getAccessTokenSilently();
		axios
			.put(`${API_BASE_URL}/api/my/user`, formData, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
					"Content-Type": "application/json",
				},
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			});
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
			toast.error((error as Error).toString());
			reset();
		},
	});

	return {updateUser, isLoading};
};
