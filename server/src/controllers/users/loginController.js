import bcrypt from "bcrypt";
import { generateToken } from "../../services/jwtService.js";
import { selectUserByEmailModel } from "../../models/users/index.js";
import { invalidCredentialsError, inactiveUserError } from "../../services/errorService.js";

const loginController = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		let validPass;

		const user = await selectUserByEmailModel(email);

		user && (validPass = await bcrypt.compare(password, user.password));

		(!user || !validPass) && invalidCredentialsError();

		!user.active && inactiveUserError();

		const tokenInfo = {
			id: user.id,
			role: user.role,
		};
		const token = generateToken(tokenInfo);

		res.send({
			status: "ok",
			message: "Usuario logueado",
			data: {
				token,
			},
		});
	} catch (err) {
		console.log(err);
		next(err);
	}
};

export default loginController;
