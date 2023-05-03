import { Router } from "express";
import UserJWT, { prisma } from "../models/User/UserJWT.model";

const router = Router();

const user = new UserJWT(prisma.user);

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  const findUserDB = await user.findUser(email).catch((err) => {
    console.log("Error: ", err);
  });

  if (findUserDB) {
    console.log("USUARIO REGISTRADO");
  } else {
    await user.createUser({ name, email, password }).catch((err) => {
      console.log("Email registrado");
      res.json({ msg: "Usuario Registrado" });
    });
  }

  res.json({ msg: req.body });
});

export default router;
