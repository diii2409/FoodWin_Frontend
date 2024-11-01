import {useCreateMyRestaurant} from "@/api/MyRestaurantApi";
import {Button} from "@/components/ui/button";
import {Form} from "@/components/ui/form";
import LoadingButton from "@/components/ui/LoadingButton";
import {Separator} from "@/components/ui/separator";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {ToastContainer} from "react-toastify";
import {z} from "zod";
import CuisinesSection from "./CuisinesSection";
import DetailSection from "./DetailSection";
import ImageSection from "./ImageSection";
import MenuSection from "./MenuSection";

const formSchema = z.object({
	restaurantName: z.string({required_error: "restaurantName is required"}),
	city: z.string({required_error: "City is required"}),
	country: z.string({required_error: "Country is required"}),
	deliveryPrice: z.coerce.number({
		required_error: "Delivery price is required",
		invalid_type_error: "Delivery price must be a number",
	}),
	estimatedDeliveryTime: z.coerce.number({
		required_error: "Deliver time is required",
		invalid_type_error: "Deliver time must be a valid number",
	}),
	cuisines: z.array(z.string().min(1, {message: "Cuisine must not be empty"})),
	menuItems: z.array(
		z.object({
			name: z.string().min(1, {message: "Menu item name is required"}),
			price: z.coerce
				.number({
					required_error: "Price is required",
					invalid_type_error: "Price must be a valid number",
				})
				.min(1000, {message: "Price must be greater than 1000 vnd"}),
		}),
	),
	imageFile: z.instanceof(File, {message: "Image file is required"}),
});

type restaurantFormData = z.infer<typeof formSchema>;

const ManageRestaurantForm = () => {
	const [key, setKey] = useState(0);
	const form = useForm<restaurantFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			restaurantName: "",
			city: "",
			country: "",
			deliveryPrice: 0,
			estimatedDeliveryTime: 0,
			cuisines: [],
			menuItems: [{name: "", price: 0}],
		},
	});

	const {createRestaurant, isPending} = useCreateMyRestaurant();

	const onsubmit = async (_: restaurantFormData, e: any) => {
		const formData = new FormData(e.target as HTMLFormElement);
		const custId = formData.getAll("custId");
		let index = 0;
		custId.forEach(cuisine => {
			if (cuisine !== "") {
				formData.append(`cuisines[${index++}]`, cuisine);
			}
		});
		formData.delete("custId");

		createRestaurant(formData, {
			onSuccess() {
				form.reset();
				setKey(key + 1);
			},
		});
	};

	return (
		<Form {...form}>
			<form
				key={key}
				onSubmit={form.handleSubmit(onsubmit)}
				className="space-y-8 bg-gray-50 p-10 rounded-lg">
				<DetailSection />
				<Separator />
				<CuisinesSection />
				<Separator />
				<MenuSection />
				<Separator />
				<ImageSection />
				{isPending ? <LoadingButton /> : <Button type="submit" onClick={form.getValues()}>Submit</Button>}
			</form>
			<ToastContainer limit={3} />
		</Form>
	);
};

export default ManageRestaurantForm;
