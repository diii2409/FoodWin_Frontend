import {Order} from "@/types";
import {Separator} from "./ui/separator";

type Props = {
	order: Order;
};
const OrderStatusDetail = ({order}: Props) => {
	return (
		<div className="space-y-5">
			<div className="flex flex-col">
				<span className="font-bold">Delivering to: </span>
				<span>{order.deliveryDetails.name}</span>
				<span>
					{order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
				</span>
			</div>
			<div className="flex flex-col">
				<span className="font-bold">Your Order</span>
				<ul>
					{order.cartItems.map((item, index) => (
						<li key={`order_item_${index}`}>
							<span>
								{item.quantity} x {item.name}
							</span>
						</li>
					))}
				</ul>
			</div>
			<Separator />
			<span className="flex flex-col">
				<span className="font-bold">Total</span>
				<span>{order.totalAmount ||  0} $</span>
			</span>
		</div>
	);
};

export default OrderStatusDetail;
