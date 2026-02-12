import Joi from "joi";
type postValidationType = {
  content: string;
  mediaIds?: string[];
  user?: string;
};
function postValidation(data: postValidationType) {
  const schema = Joi.object({
    content: Joi.string().min(3).required(),
    user: Joi.string().min(10).required(),
  });
  return schema.validate(data);
}
export { postValidation };
