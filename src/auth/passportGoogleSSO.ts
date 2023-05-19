import passport from "passport";
import { UserGoogleModel } from "@entities/UserGoogle.model";
import UsersGoogle, { prisma } from "@models/User/UserGoogle.model";

const user = new UsersGoogle(prisma.userGoogle);

var GoogleStrategy = require("passport-google-oauth20").Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.PASSPORT_GOOGLE_CALLBACK_URL,
      scope: ["profile", "email"],
    },
    async function (
      accessToken: any,
      refreshToken: any,
      profile: any,
      cb: any
    ) {
      const findUser = await user.findUser({
        email: profile.emails[0].value,
      });

      if (findUser) {
        const token = await user.updateToken(
          profile.emails[0].value,
          accessToken
        );
        return cb(null, token);
      } else {
        const User = new UserGoogleModel(
          profile.displayName,
          profile.emails[0].value,
          profile.id,
          profile.photos[0].value,
          accessToken
        );
        const createUser = await user.createUser(User);
        return cb(null, createUser);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("Serializing", user);
  done(null, user);
});
passport.deserializeUser(async (user, done) => {
  console.log("Deserializing", user);
  done(null, user);
});
