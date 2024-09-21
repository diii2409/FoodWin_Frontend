import {useAuth0} from "@auth0/auth0-react";
import {Link} from "react-router-dom";
import {Button} from "./ui/button";

export default function MobileNavLink() {
	const {logout} = useAuth0();
	return (
		<>
			<Link
				className="flex bg-white items-center font-bold hover:text-orange-500"
				to="/">
				User Profile
			</Link>
			<Button
				className="flex-1 font-bold bg-orange-500"
				onClick={async () => await logout()}>
				Log out
			</Button>
		</>
	);
}
