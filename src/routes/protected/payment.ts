import { Router } from "express";
import passport from "passport";
import { authorizationGoogle } from "@controllers/authorizationGoogle.controller";
require("../../auth/passport");

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user) {
      return res.send({ user: req.user });
    } else {
      return res.redirect("/refresh-token");
    }
  }
);

router.get("/google", authorizationGoogle);

export default router;
