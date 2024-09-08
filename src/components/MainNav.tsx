import {useAuth0} from "@auth0/auth0-react";
import clsx from "clsx";
import {Button} from "./ui/button";

export default function MainNav({className = ""}: {className?: string}) {
	const {loginWithRedirect} = useAuth0();
	return (
		<Button
			variant="ghost"
			className={clsx(
				"font-bold hover:text-orange-500 hover:bg-white",
				className,
			)}
			onClick={async () => await loginWithRedirect()}>
			Log In
		</Button>
	);
}
