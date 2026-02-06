import { Router } from "express";
import {
  createRequest,
  deleteRequest,
  getMyRequests,
  getRequestById,
  getRequests,
  getSubjects,
  updateRequest,
} from "../controllers/request.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getRequests);
router.get("/mine", authMiddleware, getMyRequests);
router.get("/:id", getRequestById);
router.get("/subjects", getSubjects);
router.post("/", authMiddleware, createRequest);
router.patch("/:id", authMiddleware, updateRequest);
router.delete("/:id", authMiddleware, deleteRequest);

export default router;
