import {Navigate, Route, Routes} from "react-router-dom";
import ProtectedRouter from "./auth/ProtectedRouter";
import {Layout} from "./layouts";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import HomePage from "./pages/HomePage";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import UserProfilePage from "./pages/UserProfilePage";

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/auth-callback" element={<AuthCallbackPage />} />
			<Route
				path="/"
				element={
					<Layout showHero>
						<HomePage />
					</Layout>
				}
			/>
			<Route element={<ProtectedRouter />}>
				<Route
					path="/user-profile"
					element={
						<Layout>
							<UserProfilePage />
						</Layout>
					}
				/>
			</Route>
			<Route
				path="/manage-restaurant"
				element={
					<Layout>
						<ManageRestaurantPage />
					</Layout>
				}
			/>
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
};

export default AppRoutes;
