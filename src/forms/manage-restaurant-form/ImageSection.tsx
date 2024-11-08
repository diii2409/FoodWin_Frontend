import {AspectRatio} from "@/components/ui/aspect-ratio";
import {FormControl, FormDescription, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useFormContext} from "react-hook-form";

export default function ImageSection() {
	const {control, watch} = useFormContext();
	const existingImage = watch("imageUrl");
	return (
		<div className="space-y-2 ">
			<div>
				<h2 className="text-2xl font-bold">Image</h2>
				<FormDescription className="mb-1">
					Add an image that will be displayed on your restaurant listing in the search results. Add
					a new image will overwrite the existing one.
				</FormDescription>
			</div>

			<div className="flex flex-col gap-8 w-[50%]">
				{existingImage && (
					<AspectRatio key={existingImage} ratio={16 / 9}>
						<img
							src={existingImage}
							alt="restaurant"
							className="object-cover rounded-sm h-full w-full"
						/>
					</AspectRatio>
				)}
				<FormField
					control={control}
					name="imageFile"
					render={({field}) => {
						return (
							<FormItem>
								<FormControl>
									<Input
										name="imageFile"
										className="bg-white"
										type="file"
										accept=".jpg, .jpeg, .png"
										onChange={event => {
											field.onChange(event.target.files ? event.target.files[0] : null);
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						);
					}}
				/>
			</div>
		</div>
	);
}
