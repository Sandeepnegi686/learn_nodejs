import joi from "joi";

type RegistrationRequestBodyType = {
  username: string;
  email: string;
  password: string;
};
type LoginRequestBodyType = {
  email: string;
  password: string;
};

function validateRegistration(data: RegistrationRequestBodyType) {
  const schema = joi.object({
    username: joi.string().min(3).max(50).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  });

  return schema.validate(data);
}
function validateLogin(data: LoginRequestBodyType) {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  });

  return schema.validate(data);
}

export { validateRegistration, validateLogin };
