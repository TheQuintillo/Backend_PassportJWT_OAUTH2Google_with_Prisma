import { Request, Response } from "express";
import UserJWT, { prisma } from "@models/User/UserJWT.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const handleLogin = async (req: Request, res: Response) => {
  const User = new UserJWT(prisma.user);
  const cookies = req.cookies;
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ msg: "Email and password son requeridos" });

  const foundUser = await User.findUser(email);
  console.log(foundUser.id);
  if (!foundUser) return res.sendStatus(401); //Unauthorized

  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const roles = foundUser.role;
    const accessToken = await jwt.sign(
      {
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
      },
      process.env.SECRET_JWT,
      { expiresIn: "10s" }
    );
    const newRefreshToken = await jwt.sign(
      { id: foundUser.id, email: foundUser.email },
      process.env.SECRET_JWT,
      {
        expiresIn: "1d",
      }
    );

    const newRefreshTokenArray = !cookies?.jwt
      ? foundUser.refreshToken
      : foundUser.refreshToken.filter((rt) => rt !== cookies.jwt);

    if (cookies?.jwt)
      res.clearCookie("jwt", { httpOnly: true, sameSite: "none" });

    const Update = await User.updateToken(
      [...newRefreshTokenArray, newRefreshToken],
      foundUser.email
    );
    console.log(Update);

    req.user = foundUser;
    console.log(newRefreshToken);
    await res.cookie("jwt", newRefreshToken);
    return res.json(req.user);
  }
};

export default handleLogin;
