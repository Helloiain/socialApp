import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";

import { useForm } from "../utils/hooks";

function Register(props) {
	const navigate = useNavigate();
	const [errors, setErrors] = useState({});

	const { onChange, onSubmit, values } = useForm(registerUser, {
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [addUser, { loading }] = useMutation(REGISTER_USER, {
		update(_, result) {
			navigate("/");
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.errors);
		},
		variables: values,
	});

	function registerUser() {
		addUser();
	}

	return (
		<div className="form-container">
			<Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
				<h1>Register</h1>
				<Form.Input
					label="username"
					placeholder="Username.."
					name="username"
					value={values.username}
					error={errors.username ? true : false}
					onChange={onChange}
				/>
				<Form.Input
					label="email"
					placeholder="email.."
					name="email"
					value={values.email}
					error={errors.email ? true : false}
					onChange={onChange}
				/>
				<Form.Input
					label="password"
					placeholder="password.."
					name="password"
					type="password"
					value={values.password}
					error={errors.password ? true : false}
					onChange={onChange}
				/>
				<Form.Input
					label="confirm password"
					placeholder="confirm password.."
					name="confirmPassword"
					type="password"
					value={values.confirmPassword}
					error={errors.confirmPassword ? true : false}
					onChange={onChange}
				/>
				{/* semantic-ui Button throws error so i used custom styling */}
				<Button color="blue" type="submit">
					Register
				</Button>
			</Form>
			{Object.keys(errors).length > 0 && (
				<div className="ui error message">
					<ul className="list">
						{Object.values(errors).map((value) => (
							<li key={value}>{value}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

const REGISTER_USER = gql`
	mutation register(
		$username: String!
		$email: String!
		$password: String!
		$confirmPassword: String!
	) {
		register(
			registerInput: {
				username: $username
				email: $email
				password: $password
				confirmPassword: $confirmPassword
			}
		) {
			id
			email
			username
			createdAt
			token
		}
	}
`;

export default Register;
