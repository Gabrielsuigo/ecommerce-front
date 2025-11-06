import validator from "validator";

// Ajustamos el máximo por defecto
const validateLength = (
  value: string,
  fieldName: string,
  min = 4,
  max = 50
): string => {
  return validator.isLength(value, { min, max })
    ? ""
    : `${fieldName} debe tener entre ${min} y ${max} caracteres.`;
};

export const validateEmail = (email: string): string => {
  return validator.isEmail(email) ? "" : "Email inválido.";
};

export const validatePassword = (password: string): string => {
  let error = validateLength(password, "contraseña", 4, 20);
  if (error) return error;

  if (!/[A-Z]/.test(password)) {
    return "La contraseña debe tener al menos una letra mayúscula.";
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "La contraseña debe tener al menos un carácter especial.";
  }

  return "";
};

export const validateName = (name: string): string => {
  return validateLength(name, "Nombre");
};

export const validateAddress = (address: string): string => {
  return validateLength(address, "Dirección");
};

export const validatePhone = (phone: string): string => {
  return validator.isNumeric(phone) ? "" : "teléfono inválido";
};
