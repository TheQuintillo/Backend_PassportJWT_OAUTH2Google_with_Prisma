import passport from "passport";
import passportJwt from "passport-jwt";
import UserJWT, { prisma } from "../models/User/UserJWT.model";

const User = new UserJWT(prisma.user);
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "prueba",
};

passport.use(
  new StrategyJwt(opts, async function (jwt_payload, done) {
    const user = await User.findUserById(jwt_payload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  })
);
