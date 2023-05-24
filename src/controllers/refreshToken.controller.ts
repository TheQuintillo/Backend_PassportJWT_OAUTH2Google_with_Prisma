import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserJWT, { prisma } from "@models/User/UserJWT.model";
import { error } from "console";

const handleRefreshToken = async (req: Request, res: Response) => {
  const User = new UserJWT(prisma.user);
  const cookies = req.cookies;
  if (!cookies.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  res.clearCookie("jwt");
  console.log(refreshToken);

  const foundUser = await User.findUserByRefreshToken(refreshToken);
  if (!foundUser) {
    jwt.verify(
      refreshToken,
      process.env.SECRET_JWT,
      async (err: any, decoded: any) => {
        if (err) return res.sendStatus(403);
        const hackedUser = await User.findUser(decoded.email);
        User.updateToken("", hackedUser.email);
      }
    );
    return res.sendStatus(403); // FORBIDDEN
  }

  const newRefreshTokenArray = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );

  jwt.verify(
    refreshToken,
    process.env.SECRET_JWT,
    async (err: any, decoded: any) => {
      if (err) {
        await User.updateToken([...newRefreshTokenArray], foundUser.email);
      }
      if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
      const roles = foundUser.role;
      const accessToken = await jwt.sign(
        {
          email: decoded.email,
          role: roles,
        },
        process.env.SECRET_JWT,
        { expiresIn: "10s" }
      );

      const newRefreshToken = await jwt.sign(
        {
          email: decoded.email,
        },
        process.env.SECRET_JWT,
        { expiresIn: "1d" }
      );
      await User.updateToken(
        [...newRefreshTokenArray, newRefreshToken],
        foundUser.email
      );
      res.cookie("jwt", newRefreshToken);

      res.json({ roles, accessToken });
    }
  );
};

export default handleRefreshToken;
