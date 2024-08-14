export const notFoundError = (resource) => {
	throw {
		httpStatus: 404, // Not Found
		code: "RESOURCE_NOT_FOUND",
		message: `El recurso requerido '${resource}' no existe`,
	};
};

export const requiredFieldsError = () => {
	throw {
		httpStatus: 400,
		code: "RESOURCE_REQUIRED",
		message: "Los campos characterId y guildId son obligatorios.",
	};
};

export const invalidCredentialsError = () => {
	throw {
		httpStatus: 401, // Unauthorized
		code: "INVALID_CREDENTIALS",
		message: "Credenciales inválidas",
	};
};

export const pendingActivationError = () => {
	throw {
		httpStatus: 403, // Forbidden
		code: "PENDING_ACTIVATION",
		message: "Usuario pendiente de activar. Por favor, verifica tu cuenta antes de continuar.",
	};
};

export const saveFileError = () => {
	throw {
		httpStatus: 500, // Internal Server Error
		code: "FILE_SAVE_FAILED",
		message: "Error al guardar el archivo en el disco",
	};
};

export const deleteFileError = () => {
	throw {
		httpStatus: 409, // Conflict
		code: "FILE_DELETED_FAILED",
		message: "Error al eliminar el archivo del disco",
	};
};

export const sendEmailError = () => {
	throw {
		httpStatus: 500, // Internal server error
		code: "SEND_EMAIL_FAILED",
		message: "Error al enviar email",
	};
};

export const emailAlreadyRegisterError = () => {
	throw {
		httpStatus: 409, // conflicto
		code: "EMAIL_ALREADY_REGISTERED",
		message: "El email ya está registrado, intenta con otro!",
	};
};

export const usernameAlreadyRegisteredError = () => {
	throw {
		httpStatus: 409, // conflicto
		code: "USERNAME_ALREADY_REGISTERED",
		message: "El nombre de usuario ya está registrado, intenta con otro!",
	};
};

export const notAuthenticatedError = () => {
	throw {
		httpStatus: 401, // Unauthorized
		code: "NOT_AUTHENTICATED",
		message: `Debes enviar un token en el header 'Authorization'`,
	};
};

export const invalidTokenError = () => {
	throw {
		httpStatus: 401, // Unauthorized
		code: "INVALID_TOKEN",
		message: "Sesión expirada, por favor inicia sesión nuevamente",
	};
};

export const recoveryCodeError = () => {
	throw {
		httpStatus: 400,
		code: "RECOVERY_CODE_ERROR",
		message: "El código de recuperación es incorrecto",
	};
};
