import {useAxiosWithAuth} from "@/hooks/useAxiosWithAuth";
import {User} from "@/types";
import {useMutation, useQuery} from "@tanstack/react-query";
import {Bounce, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {useQueryClient} from "@tanstack/react-query";

type CreateUserRequest = {
	auth0Id: string;
	email: string;
};

// Hook to create user
export const useCreateUser = () => {
	const axiosInstance = useAxiosWithAuth();
	const createMyUserRequest = async (user: CreateUserRequest) => {
		await axiosInstance.post("/api/my/user", user);
	};

	const {
		mutateAsync: createUser,
		isPending,
		isError,
		isSuccess,
	} = useMutation({
		mutationFn: createMyUserRequest,
	});

	return {createUser, isPending, isError, isSuccess};
};

type UpdateUserRequest = {
	name: string;
	addressLine1: string;
	city: string;
	country: string;
};

// Hook to update user
export const useUpdateMyUser = () => {
	const axiosInstance = useAxiosWithAuth();
	const queryClient = useQueryClient();

	const updateMyUserRequest = async (formData: UpdateUserRequest) => {
		const response = await axiosInstance.put("/api/my/user", formData);
		if (response.status !== 200) {
			throw new Error("Failed to update user");
		}
		return response.data;
	};

	const {
		mutateAsync: updateUser,
		isPending,
		reset,
	} = useMutation({
		mutationFn: updateMyUserRequest,
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
			queryClient.invalidateQueries({
				queryKey: ["fetchCurrentUser"],
			});
		},
		onError: error => {
			toast.error("Error updating user profile", {
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
			console.log(error);
			reset();
		},
	});

	return {updateUser, isPending};
};

// Hook to get user
export const useGetMyUser = () => {
	const axiosInstance = useAxiosWithAuth();

	const getMyUserRequest = async (): Promise<User> => {
		const response = await axiosInstance.get("/api/my/user");
		if (response.status !== 200) {
			throw new Error("Failed to get user");
		}
		return response.data;
	};

	const {
		data: currentUser,
		isPending,
		error,
	} = useQuery({
		queryKey: ["fetchCurrentUser"],
		queryFn: getMyUserRequest,
	});
	if (error) {
		console.log(error);
		toast.error("Error fetching user profile");
	}

	return {currentUser, isPending};
};
