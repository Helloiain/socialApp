import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./utils/authRoute";

import MenuBar from "./components/MenuBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Container>
					<MenuBar />

					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route
							exact
							path="/login"
							element={
								<AuthRoute>
									<Login />
								</AuthRoute>
							}
						/>
						<Route
							exact
							path="/register"
							element={
								<AuthRoute>
									<Register />
								</AuthRoute>
							}
						/>
					</Routes>
				</Container>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
