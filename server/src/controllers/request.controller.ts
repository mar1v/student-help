import { RequestHandler } from "express";
import RequestModel from "../models/Request";
import { requestService } from "../services/request.service";

export const getRequests: RequestHandler = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = req.query.search as string | undefined;
  const sort =
    (req.query.sort as
      | "date_desc"
      | "date_asc"
      | "title_asc"
      | "title_desc"
      | undefined) || "date_desc";

  const data = await requestService.getList({ page, limit, search, sort });
  res.json(data);
};

export const getMyRequests: RequestHandler = async (req, res) => {
  const user = (req as any).user;
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = req.query.search as string | undefined;
  const sort =
    (req.query.sort as
      | "date_desc"
      | "date_asc"
      | "title_asc"
      | "title_desc"
      | undefined) || "date_desc";

  const data = await requestService.getList({
    page,
    limit,
    search,
    sort,
    myUserId: user.id,
  });

  res.json(data);
};

export const getRequestById: RequestHandler = async (req, res) => {
  const doc = await requestService.getById(req.params.id);

  if (!doc) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(doc);
};

export const getSubjects: RequestHandler = async (_, res) => {
  const subjects = await RequestModel.distinct("subject");
  res.json(subjects);
};

export const createRequest: RequestHandler = async (req, res) => {
  const user = (req as any).user;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { title, description, subject } = req.body;

  const doc = await requestService.create({
    title,
    description,
    subject,
    userId: user.id,
  });
  try {
    res.status(201).json(doc);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const updateRequest: RequestHandler = async (req, res) => {
  const user = (req as any).user;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const doc = await requestService.update(req.params.id, user.id, req.body);

  if (!doc) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(doc);
};

export const deleteRequest: RequestHandler = async (req, res) => {
  const user = (req as any).user;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const doc = await requestService.delete(req.params.id, user.id);

  if (!doc) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(doc);
};
