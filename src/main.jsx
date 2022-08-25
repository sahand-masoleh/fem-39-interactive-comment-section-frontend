import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PostsContextProvider } from "@contexts/PostsContext";
import { AuthContextProvider } from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();

import App from "./App";
import Auth from "@routes/Auth";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthContextProvider>
				<PostsContextProvider>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<App />} />
							<Route path="/auth" element={<Auth />} />
						</Routes>
					</BrowserRouter>
				</PostsContextProvider>
			</AuthContextProvider>
			<ReactQueryDevtools />
		</QueryClientProvider>
	</React.StrictMode>
);
