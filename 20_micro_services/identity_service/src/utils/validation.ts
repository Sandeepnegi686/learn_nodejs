import joi from "joi";

type RegistrationRequestBodyType = {
  username: string;
  email: string;
  password: string;
};

function validateRegistration(data: RegistrationRequestBodyType) {
  const schema = joi.object({
    username: joi.string().min(3).max(50).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  });

  return schema.valid(data);
}

export { validateRegistration };
