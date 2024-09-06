import clsx from "clsx";
import {Button} from "./ui/button";

export default function MainNav({className = ""}: {className?: string}) {
	return (
		<Button
			variant="ghost"
			className={clsx(
				"font-bold hover:text-orange-500 hover:bg-white",
				className,
			)}>
			Log In
		</Button>
	);
}
