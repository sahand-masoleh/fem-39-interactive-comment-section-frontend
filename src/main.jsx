import React from "react";
import ReactDOM from "react-dom/client";

import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ContextWrapper from "./contexts/ContextWrapper";

import App from "./App";
import Auth from "@routes/Auth";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ErrorBoundary>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<Routes>
						<Route
							path="/"
							element={
								<ContextWrapper>
									<App />
								</ContextWrapper>
							}
						>
							<Route path="from/:from" element={<></>} />
							<Route path="auth" element={<Auth />} />
							<Route path="*" element={<></>} />
						</Route>
					</Routes>
				</BrowserRouter>
				{/* <ReactQueryDevtools /> */}
			</QueryClientProvider>
		</ErrorBoundary>
	</React.StrictMode>
);
