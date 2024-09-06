import {Menu} from "lucide-react";
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
	return (
		<Sheet>
			<SheetTrigger className={className}>
				<Menu className="text-orange-500" />
			</SheetTrigger>
			<SheetContent className="space-y-3">
				<SheetTitle>
					<span>Welcome to FoodWin</span>
				</SheetTitle>
				<Separator />
				<SheetDescription className="flex ">
					<Button className="flex-1 font-bold bg-orange-500">Log In</Button>
				</SheetDescription>
			</SheetContent>
		</Sheet>
	);
}
