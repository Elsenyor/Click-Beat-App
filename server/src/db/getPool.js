import mysql from "mysql2/promise";
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from "../../env.js";

let pool;

const getPool = async () => {
	try {
		if (!pool) {
			pool = mysql.createPool({
				host: DB_HOST,
				user: DB_USER,
				password: DB_PASSWORD,
				database: DB_NAME,
			});
		}

		return pool;
	} catch (err) {
		console.error(err);
		throw new Error("Error al obtener el pool de conexiones");
	}
};

export default getPool;
