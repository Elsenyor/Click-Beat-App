import getPool from "../../db/getPool.js";

const selectUserByEmailModel = async (email) => {
	const pool = await getPool();

	const [user] = await pool.query(`SELECT id, password, username, role, active FROM users WHERE email = ?`, email);

	console.log("selectUserByEmailModel", user);

	return user[0];
};

export default selectUserByEmailModel;
