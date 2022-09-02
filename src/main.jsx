import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthContextProvider } from "./contexts/AuthContext";
import { PostsContextProvider } from "@contexts/PostsContext";
import {
	HiddenContextProvider,
	HoveredContextProvider,
	FocusedContextProvider,
	ClosingContextProvider,
} from "@contexts/UIContexts";
import { ModalContextProvider } from "@contexts/ModalContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const queryClient = new QueryClient();

import App from "./App";
import Auth from "@routes/Auth";

function AppWithContexts() {
	return (
		<AuthContextProvider>
			<PostsContextProvider>
				<HiddenContextProvider>
					<HoveredContextProvider>
						<FocusedContextProvider>
							<ClosingContextProvider>
								<ModalContextProvider>
									<App />
								</ModalContextProvider>
							</ClosingContextProvider>
						</FocusedContextProvider>
					</HoveredContextProvider>
				</HiddenContextProvider>
			</PostsContextProvider>
		</AuthContextProvider>
	);
}

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<AppWithContexts />}>
						<Route path="from/:from" element={<></>} />
						<Route path="auth" element={<Auth />} />
						<Route path="*" element={<></>} />
					</Route>
				</Routes>
			</BrowserRouter>
			<ReactQueryDevtools />
		</QueryClientProvider>
	</React.StrictMode>
);
