import {useUpdateMyUser} from "@/api/MyUserApi";
import {Layout} from "@/layouts";
import {UserProfileForm} from "./../forms/user-profile-form";

export default function UserProfilePage() {
	const {updateUser, isLoading} = useUpdateMyUser();
	return (
		<Layout>
			<UserProfileForm
				onSave={data => updateUser(data)}
				isLoading={isLoading}
			/>
		</Layout>
	);
}
