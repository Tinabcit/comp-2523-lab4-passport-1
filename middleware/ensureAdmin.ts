import { Request, Response, NextFunction } from "express";

export const ensureAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.redirect("/auth/login");
  }

  const user = req.user as any;

  // ✅ debug (temporary)
  console.log("ADMIN CHECK:", { id: user?.id, name: user?.name, role: user?.role });

  if (user?.role === "admin") return next();

  return res.status(403).send("Admins only");
};
