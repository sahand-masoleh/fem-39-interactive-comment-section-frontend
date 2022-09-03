import { AuthContextProvider } from "@contexts/AuthContext";
import { PostsContextProvider } from "@contexts/PostsContext";
import {
	HiddenContextProvider,
	HoveredContextProvider,
	FocusedContextProvider,
	ClosingContextProvider,
} from "@contexts/UIContexts";
import { ModalContextProvider } from "@contexts/ModalContext";
import { ToastContextProvider } from "@contexts/ToastContext";

function ContextWrapper({ children }) {
	return (
		<AuthContextProvider>
			<ToastContextProvider>
				<PostsContextProvider>
					<HiddenContextProvider>
						<HoveredContextProvider>
							<FocusedContextProvider>
								<ClosingContextProvider>
									<ModalContextProvider>{children}</ModalContextProvider>
								</ClosingContextProvider>
							</FocusedContextProvider>
						</HoveredContextProvider>
					</HiddenContextProvider>
				</PostsContextProvider>
			</ToastContextProvider>
		</AuthContextProvider>
	);
}

export default ContextWrapper;
