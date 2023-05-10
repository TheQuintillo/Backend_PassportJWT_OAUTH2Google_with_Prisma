import { Router } from "express";
import UserJWT, { prisma } from "@models/User/UserJWT.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = Router();

const user = new UserJWT(prisma.user);

router.post("/", async (req, res) => {
  const { email, password, id } = req.body;
  const userWithEmail = await user.findUser(email).catch((err) => {
    console.log("Err: ", err);
  });
  if (!userWithEmail) return res.json({ msg: "Email no valido" });

  if (userWithEmail) {
    bcrypt.compare(password, userWithEmail.password, function (err, result) {
      if (result) {
        const jwtToken = jwt.sign(
          {
            id: userWithEmail.id,
            email: userWithEmail.email,
          },
          "prueba"
        );

        res.json({
          msg: "Welcome Back!",
          token: jwtToken,
          id: userWithEmail.id,
        });
      } else {
        res.json({ msg: "Password no valido" });
      }
    });
  }
});

export default router;
