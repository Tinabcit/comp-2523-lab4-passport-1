import express from "express";
import passport from 'passport';
import { forwardAuthenticated } from "../middleware/checkAuth";

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => {
  res.render("login", {messages: (req.session as any).messages || []});
  (req.session as any).messages = [];
})
router.get("/ping", (req, res) => {
  res.send("AUTH ROUTE WORKS ✅");
});

// Redirect user to GitHub
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// GitHub callback
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/auth/login",
  }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    /* FIX ME: 😭 failureMsg needed when login fails */
    failureMessage: true,
  })
);

router.get("/logout", (req, res, next) => {
  console.log("✅ LOGOUT ROUTE HIT");
  debugger;

  req.logout((err) => {
    if (err) return next(err);
    res.send("Logged out ✅ (temporary)");
  });
});

export default router;
