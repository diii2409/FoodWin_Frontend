import {useAuth0} from "@auth0/auth0-react";
import {Menu} from "lucide-react";
import MobileNavLink from "./MobileNavLink";
import {Button} from "./ui/button";
import {Separator} from "./ui/separator";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger,
} from "./ui/sheet";

export default function MobileNav({className = ""}: {className?: string}) {
	const {loginWithRedirect, isAuthenticated, user} = useAuth0();
	return (
		<Sheet>
			<SheetTrigger className={className}>
				<Menu className="text-orange-500" />
			</SheetTrigger>
			<SheetContent className="space-y-3">
				<SheetTitle>
					{isAuthenticated ? (
						<span>Welcome, {user?.name}</span>
					) : (
						<span>Welcome to FoodWin</span>
					)}
				</SheetTitle>
				<Separator />
				<SheetDescription className="flex flex-col gap-4">
					{isAuthenticated ? (
						<MobileNavLink />
					) : (
						<Button
							className="flex-1 font-bold bg-orange-500"
							onClick={async () => await loginWithRedirect()}>
							Log In
						</Button>
					)}
				</SheetDescription>
			</SheetContent>
		</Sheet>
	);
}
