import {UserProfileForm} from "@/forms/user-profile-form";
import {CardItem} from "@/pages/DetallPage";
import {Restaurant} from "@/types";
import {useAuth0} from "@auth0/auth0-react";
import {useLocation} from "react-router-dom";
import {Button} from "./ui/button";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "./ui/dialog";
import LoadingButton from "./ui/LoadingButton";

type Props = {
	disabled: boolean;
	cartItems?: CardItem[];
	restaurant?: Restaurant;
};

export default function CheckoutButton({disabled, cartItems, restaurant}: Props) {
	const {isAuthenticated, isLoading, loginWithRedirect} = useAuth0();

	const {pathname} = useLocation();

	const onLogin = async () => {
		await loginWithRedirect({
			appState: {returnTo: pathname},
		});
	};
	if (!isAuthenticated) {
		return (
			<Button onClick={onLogin} className={"bg-orange-500 flex-1"}>
				Login to checkout
			</Button>
		);
	} else if (isLoading) {
		return <LoadingButton />;
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button disabled={disabled} className={"bg-orange-500 flex-1"}>
					Checkout
				</Button>
			</DialogTrigger>
			<DialogContent className={"max-w-[425px] md:min-w-[700px] gap-0 "}>
				<DialogTitle />
				<UserProfileForm
					title="Confirm Delivery Details"
					buttonText="Continue to payment"
					cartItems={cartItems}
					restaurant={restaurant}
				/>
			</DialogContent>
		</Dialog>
	);
}
