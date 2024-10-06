import {useGetMyUser, useUpdateMyUser} from "@/api/MyUserApi";
import {UserProfileForm} from "./../forms/user-profile-form";

export default function UserProfilePage() {
	const {updateUser, isLoading: isUpdateLoading} = useUpdateMyUser();
	const {currentUser, isLoading: isGetLoading} = useGetMyUser();
	if (isGetLoading) {
		return <div>Loading...</div>;
	} else if (!currentUser) {
		return <div>unable to load user profile</div>;
	}
	return (
		<>
			<UserProfileForm
				onSave={data => updateUser(data)}
				isLoading={isUpdateLoading}
				user={currentUser}
			/>
		</>
	);
}
