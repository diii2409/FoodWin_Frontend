import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {QueryClient, QueryClientProvider} from "react-query";
import {BrowserRouter as Router} from "react-router-dom";
import {Toaster} from "sonner";
import AppRoutes from "./AppRoutes";
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate";
import "./index.css";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Router>
			<QueryClientProvider client={queryClient}>
				<Auth0ProviderWithNavigate>
					<AppRoutes />
					<Toaster visibleToasts={1} position="top-right" richColors />
				</Auth0ProviderWithNavigate>
			</QueryClientProvider>
		</Router>
	</StrictMode>,
);
