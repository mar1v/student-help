import { RequestHandler } from "express";
import { authService } from "../services/auth.service";

export const register: RequestHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body as {
      name: string;
      email: string;
      password: string;
    };
    if (!name || !name.trim())
      return res.status(400).json({ message: "Name is required" });
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email))
      return res.status(400).json({ message: "Invalid email" });
    if (!password || password.length < 8)
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });

    await authService.register(name, email, password);
    res.json({ message: "Registered" });
  } catch (err: any) {
    res.status(400).json({ message: err.message || "Error" });
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email))
      return res.status(400).json({ message: "Invalid email" });
    if (!password || password.length < 8)
      return res.status(400).json({ message: "Invalid credentials" });

    const out = await authService.login(email, password);
    res.json(out);
  } catch (err: any) {
    res.status(400).json({ message: err.message || "Invalid credentials" });
  }
};
