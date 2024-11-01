import {Button} from "@/components/ui/button";
import {FormDescription, FormField, FormItem} from "@/components/ui/form";
import {useFieldArray, useFormContext} from "react-hook-form";
import MenuItemInput from "./MenuItemInput";

export default function MenuSection() {
	const {control} = useFormContext();

	const {fields, append, remove} = useFieldArray({
		control,
		name: "menuItems",
	});
	return (
		<div className="space-y-2 flex flex-col md:block">
			<div className="mb-1">
				<h2 className="text-2xl font-bold">Menu</h2>
				<FormDescription className="mb-1">
					Create your menu and give each item a name and a price.
				</FormDescription>
				<FormField
					control={control}
					name="menuItems"
					render={() => {
						return (
							<FormItem className="flex flex-col gap-2">
								{fields.map((item, index) => (
									<MenuItemInput
										index={index}
										key={item.id}
										removeMenuItem={() => remove(index)}
									/>
								))}
							</FormItem>
						);
					}}
				/>
			</div>
			<Button
				type="button"
				onClick={() => append({name: "", price: ""})}
				className="">
				Add Menu Item
			</Button>
		</div>
	);
}
