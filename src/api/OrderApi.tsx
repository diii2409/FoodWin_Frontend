import {useAxiosWithAuth} from "@/hooks/useAxiosWithAuth";
import {CheckoutSessionRequest} from "@/types";
import {useMutation} from "@tanstack/react-query";
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
