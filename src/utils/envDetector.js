export function serverURL() {
	if (import.meta.env.PROD) {
		return import.meta.env.VITE_BACKEND_URL_PROD;
	} else if (import.meta.env.DEV) {
		return import.meta.env.VITE_BACKEND_URL_DEV;
	}
}

export function clientId() {
	if (import.meta.env.PROD) {
		return import.meta.env.VITE_CLIENT_ID_PROD;
	} else if (import.meta.env.DEV) {
		return import.meta.env.VITE_CLIENT_ID_DEV;
	}
}
