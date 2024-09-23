import {Navigate, Route, Routes} from "react-router-dom";
import AuthCallbackPage from "./pages/AuthCallBackPage";
import HomePage from "./pages/HomePage";

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/auth-callback" element={<AuthCallbackPage />} />
			<Route path="/" element={<HomePage />} />
			<Route path="/user-profile" element={<span>USER PROFILE PAGE</span>} />
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
};

export default AppRoutes;
