import {useGetMyUser, useUpdateMyUser} from "@/api/MyUserApi";
import {useCreateCheckoutSession} from "@/api/OrderApi";
import {Button} from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import LoadingButton from "@/components/ui/LoadingButton";
import {CardItem} from "@/pages/DetallPage";
import {Restaurant} from "@/types";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
// Định nghĩa schema cho dữ liệu của form
const formSchema = z.object({
	email: z.string().optional(),
	name: z.string().min(1, {message: "Name is required"}),
	addressLine1: z.string().min(1, {message: "Address Line 1 is required"}),
	city: z.string().min(1, {message: "City is required"}),
	country: z.string().min(1, {message: "Country is required"}),
});

// Xác định kiểu dữ liệu của form
export type UserFormData = z.infer<typeof formSchema>;

// Props cho component UserProfileForm

type Props = {
	title?: string;
	buttonText?: string;
	cartItems?: CardItem[];
	restaurant?: Restaurant;
};

const UserProfileForm = ({
	title = "User Profile Form",
	buttonText = "Submit",
	cartItems,
	restaurant,
}: Props) => {
	const {updateUser, isPending: isPendingUpdateUser} = useUpdateMyUser();
	const {currentUser: user, isPending: isPendingGetUset} = useGetMyUser();
	const {createCheckoutSession, isPending: isPendingCreateCheckoutSession} =
		useCreateCheckoutSession();
	const form = useForm<UserFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: user || {
			email: "",
			name: "",
			addressLine1: "",
			city: "",
			country: "",
		},
	});
	const handleCheckout = async (data: UserFormData) => {
		if (!restaurant) {
			return;
		}
		const totalAmount =
			(cartItems?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0) +
			restaurant.deliveryPrice;

		const checkoutData = {
			cartItems:
				cartItems?.map(cartItem => ({
					menuItemId: cartItem._id,
					name: cartItem.name,
					quantity: cartItem.quantity,
				})) || [],
			restaurantId: restaurant?._id,
			deliveryDetails: {
				...data,
				email: data.email || "",
			},
			totalAmount,
		};
		const dataCheckout = await createCheckoutSession(checkoutData);
		window.location.href = dataCheckout.url;
	};
	const handleSubmit = (data: UserFormData) => {
		updateUser(data);
	};
	useEffect(() => {
		form.reset(user);
	}, [user, form]);

	if (isPendingGetUset) {
		return <div>Loading...</div>;
	} else if (!user) {
		return <div>unable to load user profile</div>;
	}

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(
						title === "User Profile Form" ? handleSubmit : handleCheckout,
					)}
					className="space-y-4 bg-gray-100 rounded-lg p-2 md:p-10">
					<div>
						<h2 className="text-2xl font-bold">{title}</h2>
						<FormDescription>View and change your user profile information here.</FormDescription>
					</div>

					{/* Input email */}
					<FormField
						control={form.control}
						name="email"
						render={({field}) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl className="flex-1">
									<Input {...field} disabled className="bg-white" type="email" />
								</FormControl>
							</FormItem>
						)}
					/>

					{/* Input name */}
					<FormField
						control={form.control}
						name="name"
						render={({field}) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl className="flex-1">
									<Input {...field} className="bg-white" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Input address */}
					<div className="flex flex-col md:flex-row gap-4">
						{/* Input addressLine1 */}
						<FormField
							control={form.control}
							name="addressLine1"
							render={({field}) => (
								<FormItem className="flex-1">
									<FormLabel>Address</FormLabel>
									<FormControl>
										<Input {...field} className="bg-white" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Input city */}
						<FormField
							control={form.control}
							name="city"
							render={({field}) => (
								<FormItem className="flex-1">
									<FormLabel>City</FormLabel>
									<FormControl>
										<Input {...field} className="bg-white" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Input country */}
						<FormField
							control={form.control}
							name="country"
							render={({field}) => (
								<FormItem className="flex-1">
									<FormLabel>Country</FormLabel>
									<FormControl>
										<Input {...field} className="bg-white" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* Nút lưu */}
					{isPendingUpdateUser || isPendingCreateCheckoutSession ? (
						<LoadingButton>Loading</LoadingButton>
					) : (
						<Button type="submit" className="bg-orange-500 text-white font-bold w-full md:w-fit">
							{buttonText}
						</Button>
					)}
				</form>
			</Form>
		</>
	);
};

export default UserProfileForm;
