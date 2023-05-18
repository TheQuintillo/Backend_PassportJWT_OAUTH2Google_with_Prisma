import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/", (req, res) => {
  res.send("HOLA");
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/login/success",
    failureRedirect: "/login_auth/auth/google/",
  }),
  (req, res) => {
    res.send({ user: req.user });
  }
);

router.get("/protected", (req, res) => {
  res.json(req.user);
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.redirect("http://localhost:3000");
    return err;
    // cannot access session here
  });
});

/*
});
*/
export default router;
