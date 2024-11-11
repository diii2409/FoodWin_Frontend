import {useGetRestaurant} from "@/api/RestaurantApi";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import {Card} from "@/components/ui/card";
import {AspectRatio} from "@radix-ui/react-aspect-ratio";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import heroImage from "../assets/hero.png";

export type CardItem = {
	_id: string;
	name: string;
	price: number;
	quantity: number;
};

export default function DetallPage() {
	const {restaurantId} = useParams();
	const {restaurant, isLoading} = useGetRestaurant(restaurantId);

	const [cartItem, setCartItem] = useState<CardItem[]>([]);
	useEffect(() => {
		const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
		if (storedCartItems) {
			setCartItem(JSON.parse(storedCartItems));
		}
	}, [restaurantId]);

	const addToCart = (menuItem: MenuItem) => {
		setCartItem(prevCartItems => {
			const existingCartItem = prevCartItems.find(cartItem => cartItem._id === menuItem._id);

			let updatedCartItems;

			if (existingCartItem) {
				updatedCartItems = prevCartItems.map(cartItem =>
					cartItem._id === menuItem._id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem,
				);
			} else {
				updatedCartItems = [
					...prevCartItems,
					{
						...menuItem,
						quantity: 1,
					},
				];
			}

			sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems));

			return updatedCartItems;
		});
	};

	const removeCartItem = (cartItem: CardItem) => {
		setCartItem(prevCartItems => {
			let updatedCartItems: CardItem[] = [];
			if (cartItem.quantity === 1) {
				updatedCartItems = prevCartItems.filter(preCartItem => preCartItem._id !== cartItem._id);
			} else if (cartItem.quantity > 1) {
				updatedCartItems = prevCartItems.map(preCartItem =>
					preCartItem._id === cartItem._id
						? {...preCartItem, quantity: preCartItem.quantity - 1}
						: preCartItem,
				);
			}

			sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems));

			return updatedCartItems;
		});
	};

	if (isLoading || !restaurant) {
		return <div>Loading...</div>;
	}
	return (
		<div className="flex flex-col gap-10">
			<AspectRatio ratio={16 / 5}>
				<img
					src={restaurant.imageUrl ? restaurant.imageUrl : heroImage}
					alt={restaurant.restaurantName}
					className={"rounded-md object-cover h-full w-full"}
				/>
			</AspectRatio>
			<div className={"grid xl:grid-cols-[4fr_2fr] gap-5 md:px-32"}>
				<div className="flex flex-col gap-4">
					<RestaurantInfo restaurant={restaurant} />
					<span className={"text-2xl font-bold tracking-tight"}>Menu</span>
					{restaurant.menuItems.map((item, index) => (
						<div key={index}>
							<MenuItem menuItem={item} addToCart={() => addToCart(item)} />
						</div>
					))}
				</div>
				<div>
					<Card>
						<OrderSummary restaurant={restaurant} cartItems={cartItem} removeCartItem={removeCartItem}/>
					</Card>
				</div>
			</div>
		</div>
	);
}
