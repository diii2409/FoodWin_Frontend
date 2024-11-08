import {Checkbox} from "@/components/ui/checkbox";
import {FormControl, FormItem, FormLabel} from "@/components/ui/form";
import {ControllerRenderProps, FieldValues} from "react-hook-form";

type Props = {
	cuisine: string;
	field: ControllerRenderProps<FieldValues, "cuisines">;
};

const CuisineCheckbox = ({cuisine, field}: Props) => {
	const checked = field.value.includes(cuisine);
	return (
		<FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
			<FormControl>
				<Checkbox
					name={cuisine}
					className="bg-white"
					checked={checked}
					onCheckedChange={checked => {
						if (checked) {
							field.onChange([...field.value, cuisine]);
						} else {
							field.onChange(field.value.filter((c: string) => c !== cuisine));
						}
					}}
				/>
			</FormControl>

			<input type="hidden" name="custId" value={checked ? cuisine : ""} />
			<FormLabel>{cuisine}</FormLabel>
		</FormItem>
	);
};

export default CuisineCheckbox;
