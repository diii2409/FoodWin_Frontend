import {ORDER_STATUS} from "@/config/order-status-config";
import {Order} from "@/types";
import {Progress} from "./ui/progress";
type Props = {
	order: Order;
};
const OrderStatusHeader = ({order}: Props) => {
	const getExpectDelivery = () => {
		const created = new Date(order.createdAt);
		created.setMinutes(created.getMinutes() + order.restaurant.estimatedDeliveryTime);
		const hours = created.getHours();
		const minutes = created.getMinutes();

		const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
		return `${hours}:${paddedMinutes}`;
	};

	const getoderInfo = () => {
		return ORDER_STATUS.find(status => status.value === order.status) || ORDER_STATUS[0];
	};

	return (
		<>
			<h1
				className={
					"text-3xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between"
				}>
				<span>Order Status: {getoderInfo().label}</span>
				<span>Expected by: {getExpectDelivery()}</span>
			</h1>
			<Progress className="animate-pulse" value={getoderInfo().progressValue}  />
		</>
	);
};

export default OrderStatusHeader;
