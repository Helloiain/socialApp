import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../context/auth";

function AuthRoute({ children }) {
	const { user } = useContext(AuthContext);

	if (!user) {
		return children;
	}

	return <Navigate to="/" replace />;
}

export default AuthRoute;
