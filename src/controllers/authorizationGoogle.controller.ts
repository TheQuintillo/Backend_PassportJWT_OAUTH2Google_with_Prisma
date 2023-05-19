import { Request, Response, NextFunction } from "express";
import UserGoogle, { prisma } from "@models/User/UserGoogle.model";
import { FindUserGoogleModel } from "@entities/UserGoogle.model";

export const authorizationGoogle = async (
  req: Request,
  res: Response,
  _: NextFunction
) => {
  if (req.user) {
    const User = new UserGoogle(prisma.userGoogle);
    const findToken = await User.authentication(req.user);
    if (findToken.token == req.user.token) return res.send("AUTORIZADO");
  }
  return res.send("No Autorizado");
};
