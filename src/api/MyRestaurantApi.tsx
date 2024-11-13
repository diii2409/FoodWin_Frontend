// src/api/MyRestaurantApi.tsx
import {useAxiosWithAuth} from "@/hooks/useAxiosWithAuth";
import {Restaurant, RestaurantOrderResponse} from "@/types";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";

export const useCreateMyRestaurant = () => {
	const axiosInstance = useAxiosWithAuth();

	const createRestaurantRequest = async (restaurant: FormData): Promise<Restaurant> => {
		const response = await axiosInstance.post("/api/my/restaurant", restaurant);
		if (response.status !== 200) {
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
				toast.error("You already have a restaurant!");
			} else {
				toast.error("Failed to create restaurant. Please try again.");
			}
			console.error(error);
		},
	});

	return {createRestaurant, isPending, isSuccess, error};
};

export const useGetMyRestaurant = () => {
	const axiosInstance = useAxiosWithAuth();

	const getRestaurantRequest = async (): Promise<Restaurant> => {
		const response = await axiosInstance.get("/api/my/restaurant");
		if (response.status !== 200) {
			throw new Error("Failed to get restaurant");
		}
		return response.data;
	};

	const {
		data: currentRestaurant,
		isPending,
		error,
	} = useQuery({
		queryKey: ["fetchMyRestaurant"],
		queryFn: getRestaurantRequest,
	});

	if (error) {
		console.error(error);
		toast.error("Failed to get restaurant");
	}

	return {currentRestaurant, isPending};
};

export const useMyUpdateRestaurant = () => {
	const axiosInstance = useAxiosWithAuth();
	const queryClient = useQueryClient();

	const updateRestaurantRequest = async (restaurant: FormData) => {
		const response = await axiosInstance.put("/api/my/restaurant", restaurant);
		if (response.status !== 200) {
			throw new Error("Failed to update restaurant");
		}
		return response.data;
	};

	const {mutate: updateRestaurant, isPending} = useMutation({
		mutationFn: updateRestaurantRequest,
		onSuccess: () => {
			toast.success("Restaurant updated successfully!");
			queryClient.invalidateQueries({
				queryKey: ["fetchMyRestaurant"],
			});
		},
		onError: (error: any) => {
			toast.error("Failed to update restaurant. Please try again.");
			console.error(error);
		},
	});

	return {updateRestaurant, isPending};
};

export const useGetMyRestaurantOrders = (page?: number) => {
	const axiosInstance = useAxiosWithAuth();

	const getRestaurantOrderRequest = async (): Promise<RestaurantOrderResponse> => {
		const response = await axiosInstance.get("/api/my/restaurant/order", {params: {page}});
		if (response.status !== 200) {
			throw new Error("Failed to get restaurant orders");
		}
		return response.data;
	};

	const {
		data: result,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["fetchMyRestaurantOrders"],
		queryFn: getRestaurantOrderRequest,
	});

	if (error) {
		console.error(error);
		toast.error("Failed to get restaurant orders");
	}

	return {result, isLoading};
};

type UpdateOrderStatusRequest = {
	orderId: string;
	status: string;
};

export const useUpdateOrderStatus = () => {
	const axiosInstance = useAxiosWithAuth();
	const queryClient = useQueryClient();

	const updateOrderStatusRequest = async ({
		orderId,
		status,
	}: UpdateOrderStatusRequest): Promise<UpdateOrderStatusRequest> => {
		const response = await axiosInstance.patch(`/api/my/restaurant/order/${orderId}/status`, {
			status,
		});
		if (response.status !== 200) {
			throw new Error("Failed to update order status");
		}
		return response.data;
	};

	const {mutate: updateOrderStatus, isPending} = useMutation({
		mutationFn: updateOrderStatusRequest,
		onSuccess: () => {
			toast.success("Order status updated successfully!");
			queryClient.invalidateQueries({
				queryKey: ["fetchMyRestaurantOrders"],
			});
		},
		onError: (error: any) => {
			toast.error("Failed to update order status. Please try again.");
			console.error(error);
		},
	});

	return {updateOrderStatus, isPending};
};
