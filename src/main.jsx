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
} from "@contexts/UIContexts";
import { ModalContextProvider } from "@contexts/ModalContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const queryClient = new QueryClient();

import App from "./App";
import Auth from "@routes/Auth";

function Contexts({ children }) {
	return (
		<AuthContextProvider>
			<PostsContextProvider>
				<HiddenContextProvider>
					<HoveredContextProvider>
						<FocusedContextProvider>
							<ModalContextProvider>{children}</ModalContextProvider>
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
			<Contexts>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<App />} />
						<Route path="/auth" element={<Auth />} />
					</Routes>
				</BrowserRouter>
			</Contexts>
			{/* <ReactQueryDevtools /> */}
		</QueryClientProvider>
	</React.StrictMode>
);
