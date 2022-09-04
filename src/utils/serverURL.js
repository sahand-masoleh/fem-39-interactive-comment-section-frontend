function serverURL() {
	if (import.meta.env.PROD) {
		return "";
	} else {
		return "http://localhost:4000";
	}
}

export default serverURL;
