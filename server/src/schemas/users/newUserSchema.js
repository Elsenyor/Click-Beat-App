import joi from "joi";

import joiErrorMessages from "../joiErrorMessages.js";

const newUserSchema = joi.object({
	username: joi.string().min(5).max(30).required().messages(joiErrorMessages),
	password: joi
		.string()
		.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/)
		.required()
		.messages(joiErrorMessages),
	email: joi.string().email().required().messages(joiErrorMessages),
});

export default newUserSchema;
