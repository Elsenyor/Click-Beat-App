import { useContext, useState } from "react";
import { AuthProvider } from "../context/AuthProvider";
import { Navigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const LogInPage = () => {
	const { authLogin, authUser } = useContext(AuthProvider);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const handleLogIn = async (e) => {
		e.preventDefault();
		try {
			await authLogin(email, password);
		} catch (err) {
			console.log(err);
		}
	};
	if (authUser) return <Navigate to="/" />;

	return (
		<>
			<main className="">
				<div className="">
					<form onSubmit={handleLogIn} className="">
						<h1 className="">Tus credenciales</h1>
						<div className="">
							<input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="" placeholder="E-mail" required />
							<label htmlFor="email" className=""></label>
						</div>
						<div className="">
							<input
								type={showPassword ? "text" : "password"}
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className=""
								placeholder="Contraseña"
								required
							/>
							<label htmlFor="password" className=""></label>
							<FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={() => setShowPassword(!showPassword)} className="" />
						</div>
						<div>
							<button type="submit" className="">
								Enviar
							</button>
						</div>
						<div className="text-center">
							<Link to="/recover-password" className="">
								Recuperar contraseña
							</Link>
							<span className="text-gray-400 mx-2">|</span>
							<Link to="/register" className="">
								Registrarse
							</Link>
							<div className="mt-4">
								<Link to="/" className="">
									Volver al inicio
								</Link>
							</div>
						</div>
					</form>
				</div>
			</main>
		</>
	);
};

export default LogInPage;
