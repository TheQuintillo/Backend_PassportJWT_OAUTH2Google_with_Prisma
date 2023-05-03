import express from "express";
import morgan from "morgan";
import authGoogleRoute from "./routes/passportAuthGoogle/authGoogle.routes";
import paymentRoute from "./routes/payment";
import passport from "passport";
import sessionPassport from "./middlewares/sessionPassport.middleware";
import cors from "cors";
import indexRouter from "./routes/imagesRoutes/images.routes";
import registerRouter from "./routes/register.route";
import loginJWT from "./routes/passportAuthJWT/authJWT.routes";

require("./auth/passportGoogleSSO");

const app = express();

//MIDDLEWARE
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(sessionPassport);

app.use(passport.initialize());
app.use(passport.session());

//ROUTES
app.use("/images", indexRouter);
app.use("/payment", paymentRoute);
app.use("/register", registerRouter);
app.use("/login", loginJWT);
app.use("/login_google", authGoogleRoute);

app.listen(4000, () => {
  console.log("server on port 4000");
});
