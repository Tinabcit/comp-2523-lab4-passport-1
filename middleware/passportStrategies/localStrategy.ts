import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserById } from "../../controllers/userController";
import { PassportStrategy } from "../../interfaces/index";
import { userModel } from "../../models/userModel";
import type { User } from "../../models/userModel";

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email: string, password: string, done: (err: any, user?: any, info?: { message: string }) => void) => {
    const user = userModel.findOne(email);

    // email does not exist
    if (!user) {
      return done(null, false, {
        message: `Couldn't find user with email: ${email}`,
      });
    }

    // email exists but password wrong
    if (user.password !== password) {
      return done(null, false, {
        message: "Password is incorrect",
      });
    }

    return done(null, user);
  }
);

/*
FIX ME (types) 😭
*/
passport.serializeUser(function (user: User, done: (err: any, id?: number) => void) {
  done(null, user.id);
});

/*
FIX ME (types) 😭
*/
passport.deserializeUser(function (id: number, done: (err: any, user?: any) => void) {
  const user = getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done(null, false);
  }
});

const passportLocalStrategy: PassportStrategy = {
  name: "local",
  strategy: localStrategy,
};

export default passportLocalStrategy;
