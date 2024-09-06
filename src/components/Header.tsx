import {Link} from "react-router-dom";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";

export default function Header() {
	return (
		<div className="border-b-2 border-b-orange-500 py-6">
			<div className="container mx-auto flex justify-between item-center px-6 md:px-0">
				<Link
					to="/"
					className="text-3xl font-bold tracking-tight text-orange-500">
					FoodWin
				</Link>
				<MobileNav className="md:hidden" />
				<MainNav className="hidden md:block" />
			</div>
		</div>
	);
}
