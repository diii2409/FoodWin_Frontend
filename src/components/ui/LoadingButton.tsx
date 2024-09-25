import {ReloadIcon} from "@radix-ui/react-icons";
import React from "react";
import {Button} from "./button";

export default function LoadingButton({
	children,
}: {
	children?: React.ReactNode;
}) {
	return (
		<Button disabled>
			<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
			{children && "Loading"}
		</Button>
	);
}
