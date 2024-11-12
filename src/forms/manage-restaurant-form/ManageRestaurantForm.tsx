import {useGetMyRestaurant, useMyUpdateRestaurant} from "@/api/MyRestaurantApi";
import {Button} from "@/components/ui/button";
import {Form} from "@/components/ui/form";
import LoadingButton from "@/components/ui/LoadingButton";
import {Separator} from "@/components/ui/separator";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import CuisinesSection from "./CuisinesSection";
import DetailSection from "./DetailSection";
import ImageSection from "./ImageSection";
import MenuSection from "./MenuSection";

const formSchema = z
	.object({
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
					.min(1, {message: "Price must be greater than 1000 $"}),
			}),
		),
		imageFile: z.instanceof(File, {message: "Image file is required"}).optional(),
		imageUrl: z.string().optional(),
	})
	.refine(data => data.imageUrl || data.imageFile, {
		message: "Either imageUrl or imageFile is required",
		path: ["imageFile"],
	});

type restaurantFormData = z.infer<typeof formSchema>;

const ManageRestaurantForm = () => {
	const [key, setKey] = useState(0);
	// const {createRestaurant, isPending: isPendingCreateRestaurant} = useCreateMyRestaurant();
	const {updateRestaurant, isPending: isPendingUpdateRestaurant} = useMyUpdateRestaurant();
	const {currentRestaurant, isPending: isPendingGetRestaurant} = useGetMyRestaurant();
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

	useEffect(() => {
		if (!currentRestaurant) {
			return;
		}

		form.reset({
			...currentRestaurant,
			cuisines: currentRestaurant.cuisines.flat() || [],
		});
	}, [currentRestaurant, form]);

	const onsubmit = async (data: restaurantFormData, e: any) => {
		const formData = new FormData(e.target as HTMLFormElement);
		// const custId = formData.getAll("custId");
		// let index = 0;
		// custId.forEach(cuisine => {
		// 	if (cuisine !== "") {
		// 		formData.append(`cuisines[${index++}]`, cuisine);
		// 	}
		// });
		// formData.delete("custId");
		const cuisines = data.cuisines;
		console.log(cuisines);
		cuisines.forEach((cuisine, index) => {
			if (cuisine) {
				formData.append(`cuisines[${index}]`, cuisine);
			}
		});
		formData.delete("custId");
		console.log("currentRestaurant?.restaurantName", currentRestaurant?.restaurantName);
		updateRestaurant(formData, {
			onSuccess() {
				setKey(key + 1);
				form.reset();
			},
		});
	};

	if (isPendingGetRestaurant) {
		return <div>Loading...</div>;
	} else if (!currentRestaurant) {
		return <div>unable to load restaurant</div>;
	}

	return (
		<>
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
					{isPendingUpdateRestaurant ? <LoadingButton /> : <Button type="submit">Submit</Button>}
				</form>
			</Form>
		</>
	);
};

export default ManageRestaurantForm;
