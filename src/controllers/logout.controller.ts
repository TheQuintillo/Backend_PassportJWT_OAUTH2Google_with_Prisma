import { Request, Response } from "express";
import UserJWT, { prisma } from "@models/User/UserJWT.model";

const handleLogout = async (req: Request, res: Response) => {
  const User = new UserJWT(prisma.user);
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findUserByRefreshToken(refreshToken);
  if (!foundUser) {
    res.clearCookie("jwt");
    res.send("cookie borrada");
    return res.sendStatus(204);
  }
  User.updateToken(
    foundUser.refreshToken.filter((rt) => rt !== refreshToken),
    foundUser.email
  );
};

export default handleLogout;
