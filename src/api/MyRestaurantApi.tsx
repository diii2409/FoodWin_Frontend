// src/api/MyRestaurantApi.tsx
import {useAxiosWithAuth} from "@/hooks/useAxiosWithAuth";
import {Restaurant} from "@/types";
import {useMutation} from "@tanstack/react-query";
import {Bounce, toast} from "react-toastify";

export const useCreateMyRestaurant = () => {
	const axiosInstance = useAxiosWithAuth();

	const createRestaurantRequest = async (
		restaurant: FormData,
	): Promise<Restaurant> => {
		const response = await axiosInstance.post(
			"/api/my/restaurant",
			restaurant,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			},
		);
		if (response.status !== 201) {
			console.log("error", response.data);
			throw new Error("Failed to create restaurant");
		}
		return response.data;
	};

	const {
		mutate: createRestaurant,
		isPending,
		isSuccess,
		error,
	} = useMutation({
		mutationFn: createRestaurantRequest,
		onSuccess: () => {
			toast.success("Restaurant created successfully!");
		},
		onError: (error: any) => {
			if (error.response.status === 409) {
				toast.error("You already have a restaurant.", {
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
			} else {
				toast.error("Failed to create restaurant. Please try again.");
			}
			console.error(error);
		},
	});

	return {createRestaurant, isPending, isSuccess, error};
};
