import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const validator = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: true } })
    .required(),
  password: Joi.string().pattern(
    new RegExp("^[a-zA-Z0-9.@$!%*#?&(){}]{3,30}$")
  ),
  repeat_password: Joi.ref("password"),
  repeat_email: Joi.ref("email"),
});

export const validatorForm = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { error } = validator.validate(req.body, { abortEarly: true });
  error ? next(new Error(error.message)) : next();
};
