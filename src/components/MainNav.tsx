import {useAuth0} from "@auth0/auth0-react";
import {clsx} from "clsx";
import {Link} from "react-router-dom";
import {Button} from "./ui/button";
import UsernameMenu from "./UsernameMenu";

export default function MainNav({className = ""}: {className?: string}) {
	const {loginWithRedirect, isAuthenticated} = useAuth0();
	return (
		<div className={clsx(" space-x-2 items-center", className)}>
			{isAuthenticated ? (
				<>
					<Link to="/order-status" className="font-bold hover:text-orange-500">
						Order Status
					</Link>
					<UsernameMenu />
				</>
			) : (
				<Button
					variant="ghost"
					className="font-bold hover:text-orange-500 hover:bg-white"
					onClick={async () => await loginWithRedirect()}>
					Log In
				</Button>
			)}
		</div>
	);
}
