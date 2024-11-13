export type User = {
	_id: string;
	email: string;
	name: string;
	addressLine1: string;
	city: string;
	country: string;
	updatedAt: string;
	createdAt: string;
};

export type MenuItem = {
	_id: string;
	name: string;
	price: number;
};

export type Restaurant = {
	_id: string;
	user: string;
	restaurantName: string;
	city: string;
	country: string;
	deliveryPrice: number;
	estimatedDeliveryTime: number;
	cuisines: string[];
	menuItems: MenuItem[];
	imageUrl: string;
	updatedAt: string;
	createdAt: string;
};

export type OrderStatus = "placed" | "paid" | "inProgress" | "outForDelivery" | "delivered";

export type Order = {
	_id: string;
	restaurant: Restaurant;
	user: User;
	cartItems: {
		menuItemId: string;
		name: string;
		quantity: string;
	}[];
	deliveryDetails: {
		name: string;
		addressLine1: string;
		city: string;
		email: string;
	};
	totalAmount: number;
	status: OrderStatus;
	createdAt: string;
	restaurantId: string;
};

export type RestaurantSearchResponse = {
	data: Restaurant[];
	pagination: {
		total: number;
		page: number;
		pages: number;
	};
};

export type OrderSearchResponse = {
	data: Order[];
	pagination: {
		total: number;
		page: number;
		pages: number;
	};
};

export type CheckoutSessionRequest = {
	cartItems: {
		menuItemId: string;
		name: string;
		quantity: number;
	}[];
	deliveryDetails: {
		email: string;
		name: string;
		addressLine1: string;
		city: string;
	};
	restaurantId: string;
	totalAmount?: number;
};
