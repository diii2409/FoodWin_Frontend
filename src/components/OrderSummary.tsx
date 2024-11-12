import {CardItem} from "@/pages/DetallPage";
import {Restaurant} from "@/types";
import {Trash2} from "lucide-react";
import {Badge} from "./ui/badge";
import {CardContent, CardHeader, CardTitle} from "./ui/card";
import {Separator} from "./ui/separator";

type Props = {
	restaurant?: Restaurant;
	cartItems?: CardItem[];
	removeCartItem: (cartItem: CardItem) => void;
};
const OrderSummary = ({restaurant, cartItems, removeCartItem}: Props) => {
	const getTotalCost = () => {
		const total = cartItems?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;
		const totalWithDelivery = total + (restaurant?.deliveryPrice || 0);

		return totalWithDelivery;
	};

	return (
		<>
			<CardHeader>
				<CardTitle className={"text-xl font-bold tracking-tight flex "}>
					<span>Your Order</span>
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-5">
				{cartItems?.map((item, index) => (
					<div key={index} className="flex justify-between">
						<span className="flex flex-row">
							<Badge variant="outline" className="mr-2">
								{item.quantity}
							</Badge>
							<span className="truncate max-w-28 block">{item.name}</span>
						</span>
						<span className="flex items-center gap-1">
							{item.price * item.quantity} vnd{" "}
							<Trash2
								className={"text-red-600 cursor-pointer hover:text-black"}
								onClick={() => removeCartItem(item)}
							/>
						</span>
					</div>
				))}
				<Separator />
				<div className="flex justify-between">
					<span>Delivery</span>
					<span>{restaurant?.deliveryPrice} vnd</span>
				</div>
				<Separator />
				<div className="flex justify-between ">
					<span>Total</span>
					<span className="text-xl font-bold tracking-tight">{getTotalCost()} vnd</span>
				</div>
				<Separator />
			</CardContent>
		</>
	);
};

export default OrderSummary;
