import { Router } from "express";
import { addResponse } from "../controllers/response.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/:id", authMiddleware, addResponse);

export default router;
