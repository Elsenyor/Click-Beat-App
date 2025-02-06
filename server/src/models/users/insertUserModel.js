import getPool from "../../db/getPool.js";
import bcrypt from "bcrypt";
import { emailAlreadyRegisterError, usernameAlreadyRegisteredError } from "../../services/errorService.js";

const insertUserModel = async (username, email, password, registrationCode, userId) => {
	const pool = await getPool();

	let [users] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
	users.length > 0 && emailAlreadyRegisterError();
	[users] = await pool.query("SELECT id FROM users WHERE username = ?", [username]);
	users.length > 0 && usernameAlreadyRegisteredError();

	const saltRounds = 12;
	const hashedPassword = await bcrypt.hash(password, saltRounds);

	const newUser = await pool.query(`INSERT INTO users (id, username, email, password, registrationCode) VALUES (?, ?, ?, ?, ?)`, [
		userId,
		username,
		email,
		hashedPassword,
		registrationCode,
	]);
	return newUser;
};

export default insertUserModel;
