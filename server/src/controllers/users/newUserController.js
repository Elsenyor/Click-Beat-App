import randomstring from "randomstring";
import sendMailService from "../../services/emailService.js";
import { insertUserModel } from "../../models/users/index.js";
import { FRONTEND_URL } from "../../../env.js";

const newUserController = async (req, res, next) => {
	try {
		// validate Schema Joi (o similar)
		const { username, email, password } = req.body;

		const registrationCode = randomstring.generate(30);

		const emailSubject = "Activa tu cuenta en Click & Beats";
		const emailBody = `¡Hola ${username}!

        Gracias por unirte a Click & Beats.

        Para activar tu cuenta en Click & Beats, haz click en el siguiente enlace:

        <a href="${FRONTEND_URL}/auth/activate/${registrationCode}">Activar mi cuenta</a>`;

		await sendMailService(email, emailSubject, emailBody);
		await insertUserModel(username, email, password, registrationCode);
		res.send({
			status: "ok",
			message: "Usuario registrado. Por favor, revisa tu email para activar tu cuenta",
			data: {
				username,
				email,
				registrationCode,
			},
		});
	} catch (err) {
		next(err);
	}
};

export default newUserController;
