import {useUpdateOrderStatus} from "@/api/MyRestaurantApi";
import {ORDER_STATUS} from "@/config/order-status-config";
import {Order, OrderStatus} from "@/types";
import {SelectValue} from "@radix-ui/react-select";
import {Separator} from "@radix-ui/react-separator";
import {useEffect, useState} from "react";
import {Badge} from "./ui/badge";
import {Card, CardContent, CardHeader, CardTitle} from "./ui/card";
import {Label} from "./ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger} from "./ui/select";

type Props = {
	order: Order;
};
const OrderItemCard = ({order}: Props) => {
	const {updateOrderStatus, isPending} = useUpdateOrderStatus();
	const [status, setStatus] = useState<OrderStatus>(order.status);

	useEffect(() => {
		setStatus(order.status);
	}, [order.status]);

	const handleStatusChange = async (newStatus: string) => {
		await updateOrderStatus({orderId: order._id, status: newStatus});
		setStatus(newStatus as OrderStatus);
	};
	const getTime = () => {
		const orderDateTime = new Date(order.createdAt);
		const minutes = orderDateTime.getMinutes();
		const hours = orderDateTime.getHours();
		const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
		return `${hours}:${paddedMinutes}`;
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="grid md:grid-cols-4 justify-between mb-3">
					<div className="">
						Customer Name: <span className="ml-2 font-normal">{order.deliveryDetails.name}</span>
					</div>
					<div className="">
						Delivery address:
						<span className="ml-2 font-normal">
							{order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
						</span>
					</div>
					<div className="">
						Time:
						<span className="ml-2 font-normal">{getTime()}</span>
					</div>
					<div className="">
						Total:
						<span className="ml-2 font-normal">{order.totalAmount} $</span>
					</div>
				</CardTitle>
				<Separator />
			</CardHeader>
			<CardContent className="flex flex-col gap-6">
				<div className="flex flex-col gap-2">
					{order.cartItems.map((item, index) => (
						<span key={index}>
							<Badge variant="outline" className="mr-2">
								{item.quantity}
							</Badge>
							{item.name}
						</span>
					))}
				</div>
				<div className={"flex flex-col space-y-2"}>
					<Label htmlFor="status">What is the status of this order ?</Label>
					<Select disabled={isPending} onValueChange={handleStatusChange} value={status}>
						<SelectTrigger id="status">
							<SelectValue placeholder="status" />
						</SelectTrigger>
						<SelectContent position="popper">
							{ORDER_STATUS.map(status => (
								<div key={status.value}>
									<SelectItem value={status.value}>{status.label}</SelectItem>
								</div>
							))}
						</SelectContent>
					</Select>
				</div>
			</CardContent>
		</Card>
	);
};

export default OrderItemCard;
