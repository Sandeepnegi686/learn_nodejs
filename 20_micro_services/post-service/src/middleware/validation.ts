import Joi from "joi";
type postValidationType = {
  content: string;
  mediaIds?: string[];
  user?: string;
};
function postValidation(data: postValidationType) {
  const schema = Joi.object({
    content: Joi.string().min(3).required(),
  });
  return schema.validate(data);
}

type createPostValidationType = {
  content: string;
};

function createPostValidation(data: createPostValidationType) {
  const schema = Joi.object({
    content: Joi.string().min(3).required(),
  });
  return schema.validate(data);
}
export { postValidation };
