import {useGetMyOrders} from "@/api/OrderApi";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import PaginationSelector from "@/components/PaginationSelector";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import {useState} from "react";
import heroImage from "../assets/hero.png";

export default function OrderStatusPage() {
	const [page, setPage] = useState<number>(1);

	const {results, isLoading} = useGetMyOrders(page);
	if (isLoading) {
		return <div>Loading...</div>;
	} else if (!results || results.data.length === 0) {
		return <div>No orders found</div>;
	}

	return (
		<div className={"space-y-10 gap-5"}>
			{results.data.map(order => (
				<div
					key={`order_${order._id}`}
					className={"space-y-10 bg-gray-50 rounded-lg p-4 shadow-md border border-gray-100"}>
					<OrderStatusHeader order={order} />
					<div className="grid gap-10 md:grid-cols-2">
						<OrderStatusDetail order={order} />
						<AspectRatio ratio={16 / 9}>
							<img
								src={order.restaurant.imageUrl || heroImage}
								alt={order.restaurant.restaurantName}
							/>
						</AspectRatio>
					</div>
				</div>
			))}
			<PaginationSelector
				page={results.pagination.page}
				pages={results.pagination.pages}
				onPageChange={setPage}
			/>
		</div>
	);
}
