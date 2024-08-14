import getPool from "../../db/getPool.js";
import { notFoundError } from "../../services/errorService.js";

const validateUserModel = async (registrationCode) => {
	const pool = await getPool();

	const [users] = await pool.query("SELECT id FROM users WHERE registrationCode = ?", [registrationCode]);

	users.length < 1 && notFoundError("usuario");

	await pool.query("UPDATE users SET verified = true, registrationCode = null WHERE registrationCode = ?", [registrationCode]);
};

export default validateUserModel;
