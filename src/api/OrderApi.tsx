import {useAxiosWithAuth} from "@/hooks/useAxiosWithAuth";
import {CheckoutSessionRequest, OrderSearchResponse} from "@/types";
import {useMutation, useQuery} from "@tanstack/react-query";
export const useCreateCheckoutSession = () => {
	const axiosInstance = useAxiosWithAuth();
	const createCheckoutSessionRequest = async (checkoutSessionRequest: CheckoutSessionRequest) => {
		const response = await axiosInstance.post(
			"/api/order/checkout/create-checkout-session",
			checkoutSessionRequest,
		);
		if (response.status !== 200) {
			throw new Error("Failed to create checkout session");
		}
		return response.data;
	};
	const {
		mutateAsync: createCheckoutSession,
		isPending,
		error,
		isSuccess,
		reset,
	} = useMutation({
		mutationFn: createCheckoutSessionRequest,
	});
	if (error) {
		console.error("Failed to create checkout session", error);
		reset();
	}
	return {createCheckoutSession, isPending, isSuccess};
};

export const useGetMyOrders = (page?: number) => {
	const axiosInstance = useAxiosWithAuth();
	const getMyOrdersRequest = async (): Promise<OrderSearchResponse> => {
		const response = await axiosInstance.get("/api/order", {params: {page}});
		if (response.status !== 200) {
			throw new Error("Failed to get orders");
		}
		return response.data;
	};
	const {
		data: results,
		isLoading,
		error,
		refetch,
	} = useQuery({
		queryKey: ["fetchMyOrders"],
		queryFn: getMyOrdersRequest,
		refetchInterval: 5000,
	});
	if (error) {
		console.error("Failed to get orders", error);
	}

	return {results, isLoading, refetch};
};
