import {Navigate, Route, Routes} from "react-router-dom";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import HomePage from "./pages/HomePage";
import UserProfilePage from "./pages/UserProfilePage";

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/auth-callback" element={<AuthCallbackPage />} />
			<Route path="/" element={<HomePage />} />
			<Route path="/user-profile" element={<UserProfilePage />} />
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
};

export default AppRoutes;
