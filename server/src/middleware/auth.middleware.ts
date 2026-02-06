import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization as string | undefined;
  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    (req as any).user = { id: decoded.id, email: decoded.email };
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
