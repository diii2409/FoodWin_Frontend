import {useGetMyRestaurantOrders} from "@/api/MyRestaurantApi";
import OrderItemCard from "@/components/OrderItemCard";
import PaginationSelector from "@/components/PaginationSelector";
import {Tabs, TabsContent, TabsList} from "@/components/ui/tabs";
import {ManageRestaurantForm} from "@/forms/manage-restaurant-form";
import {TabsTrigger} from "@radix-ui/react-tabs";
import {useState} from "react";
export default function ManageRestaurantPage() {
	const [page, setPage] = useState(1);
	const {result} = useGetMyRestaurantOrders(page);
	return (
		<Tabs defaultValue="orders">
			<TabsList>
				<TabsTrigger value="orders">Orders</TabsTrigger>
				<TabsTrigger value="restaurant">Restaurant</TabsTrigger>
			</TabsList>
			<TabsContent value="orders" className="space-y-5 bg-gray-50 py-10 rounded-sm p-6">
				<div className=" flex flex-col gap-5">
					<h2 className={"text-2xl font-bold"}>{result?.pagination.total} active orders</h2>
					{result?.data.map(order => (
						<div key={order._id}>
							<OrderItemCard order={order} />
						</div>
					))}
					<div>
						<PaginationSelector
							page={result?.pagination.page as number}
							pages={result?.pagination.pages as number}
							onPageChange={setPage}
						/>
					</div>
				</div>
			</TabsContent>
			<TabsContent value="restaurant">
				<ManageRestaurantForm />;
			</TabsContent>
		</Tabs>
	);
}
