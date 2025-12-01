import { Request, Response, NextFunction } from "express";
import { verifyAccess } from "../utils/jwt";

export interface AuthRequest extends Request {
  user?: { userId: number; email: string };
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "authorization header missing" });
  const [scheme, token] = header.split(" ");
  if (scheme !== "Bearer" || !token) return res.status(401).json({ message: "Invalid format" });
  try {
    const payload: any = verifyAccess(token);
    req.user = { userId: (payload as any).userId, email: (payload as any).email };
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid / expired token" });
  }
}
