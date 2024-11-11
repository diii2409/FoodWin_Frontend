import {useAxiosWithAuth} from "@/hooks/useAxiosWithAuth";
import {SearchState} from "@/pages/SearchPage";
import {Restaurant, RestaurantSearchResponse} from "@/types";
import {useQuery} from "@tanstack/react-query";
import {toast} from "react-toastify";

export const useSearchRestaurants = (searchSate?: SearchState, city?: string) => {
	const axiosInstance = useAxiosWithAuth();

	const createSearchRestaurantRequest = async (): Promise<RestaurantSearchResponse> => {
		const response = await axiosInstance.get(`/api/restaurants/search/${city}`, {
			params: {
				searchQuery: searchSate?.searchQuery,
				page: searchSate?.page,
				selectedCuisines: searchSate?.selectedCuisines?.join(","),
				sortOption: searchSate?.sortOption,
			},
		});
		console.log(
			"searchSate?.selectedCuisines?.join(",
			")",
			searchSate?.selectedCuisines?.join(","),
		);
		if (response.status !== 200) {
			throw new Error("Failed to search restaurants");
		}
		return response.data;
	};

	const {
		data: results,
		isError,
		isLoading,
	} = useQuery({
		queryKey: ["searchRestaurants", searchSate],
		queryFn: createSearchRestaurantRequest,
		enabled: !!city,
	});

	if (isError) {
		toast.error("Error fetching restaurants");
	}

	return {results, isLoading};
};

export const useGetRestaurant = (restaurantId?: string) => {
	const axiosInstance = useAxiosWithAuth();
	const getRestaurantRequest = async (): Promise<Restaurant> => {
		const response = await axiosInstance.get(`/api/restaurants/${restaurantId}`);
		if (response.status !== 200) {
			throw new Error("Failed to get restaurant");
		}
		return response.data;
	};
	const {
		data: restaurant,
		error,
		isLoading,
	} = useQuery({
		queryKey: ["getRestaurant", restaurantId],
		queryFn: getRestaurantRequest,
		enabled: !!restaurantId,
	});
	if (error) {
		console.log(error);
	}
	return {restaurant, isLoading};
};
