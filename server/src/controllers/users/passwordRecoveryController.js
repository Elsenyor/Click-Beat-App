import sendEmailUtil from "../../services/emailService.js";
import { recoverPasswordModel } from "../../models/users/index.js";

const passwordRecoveryController = async (req, res, next) => {
	try {
		// await validateSchema(recoverPasswordSchema, req.body);
		const { email } = req.body;
		const recoverPassCode = randomstring.generate(10);

		const emailSubject = "Recuperación de contraseña Click-Beats";

		const emailBody = `
    Hola, hemos recibido una solicitud de recuperación de contraseña para tu cuenta de Click-Beats.
    
    Haz click para <a href="${FRONTEND_URL}/reset/password/${recoverPassCode}">Recuperar contraseña</a>


    Saludos,
  `;

		await sendEmailUtil(email, emailSubject, emailBody);
		await recoverPasswordModel(email, recoverPassCode);

		res.send({ status: "ok", message: "Email de recuperación de contraseña enviado" });
	} catch (err) {
		next(err);
	}
};

export default passwordRecoveryController;
