import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter as Router} from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Router>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools />
				<Auth0ProviderWithNavigate>
					<AppRoutes />
				</Auth0ProviderWithNavigate>
			</QueryClientProvider>
		</Router>
	</StrictMode>,
);
