import session from "express-session";

const sessionPassport = session({
  secret: "prueba",
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 365 * 2 * 24 * 120 * 1000,
    domain: "localhost",
  },
});

export default sessionPassport;
