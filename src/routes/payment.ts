import { Router } from "express";
import passport from "passport";
require("../auth/passport");

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user) return res.send({ user: req.user });
  }
);

export default router;
