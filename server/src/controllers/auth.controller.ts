import { RequestHandler } from "express";
import { authService } from "../services/auth.service";

export const register: RequestHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body as {
      name: string;
      email: string;
      password: string;
    };
    await authService.register(name, email, password);
    res.json({ message: "Registered" });
  } catch (err: any) {
    res.status(400).json({ message: err.message || "Error" });
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const out = await authService.login(email, password);
    res.json(out);
  } catch (err: any) {
    res.status(400).json({ message: err.message || "Invalid credentials" });
  }
};
