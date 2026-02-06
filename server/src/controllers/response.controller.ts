import { RequestHandler } from "express";
import { responseService } from "../services/response.service";

export const addResponse: RequestHandler = async (req, res) => {
  try {
    const { message } = req.body as { message: string };
    const { id } = req.params;
    const user = (req as any).user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const doc = await responseService.add(id, user.id, message);
    res.json(doc);
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Error" });
  }
};
