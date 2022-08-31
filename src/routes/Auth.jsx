import { useContext, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function Auth() {
	const [params, setParams] = useSearchParams();
	const { checkCode } = useContext(AuthContext);
	const hasChecked = useRef(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (!hasChecked.current && params) {
			handleParams();
			hasChecked.current = true;
		}
	}, [params]);

	async function handleParams() {
		const [code, state] = [params.get("code"), params.get("state")];
		try {
			await checkCode(code, state);
		} catch (error) {
			console.log(error);
		}
		navigate("../", { replace: true });
	}
}

export default Auth;
