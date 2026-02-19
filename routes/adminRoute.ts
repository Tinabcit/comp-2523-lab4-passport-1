import express from "express";
import { ensureAdmin } from "../middleware/ensureAdmin";
import { sessionStore } from "../app"; // adjust path if needed

const router = express.Router();

router.get("/admin", ensureAdmin, (req, res) => {
  console.log("✅ HIT /admin route");
  sessionStore.all((err, sessions) => {
    if (err) return res.status(500).send("Error reading sessions");
    res.render("admin", { user: req.user || {}, sessions: sessions || {} });
  });
});


router.post("/admin/revoke/:sid", ensureAdmin, (req, res) => {
  sessionStore.destroy(req.params.sid, (err) => {
    if (err) return res.status(500).send("Error revoking session");
    res.redirect("/admin");
  });
});
console.log("✅ HIT /admin route");


export default router;
