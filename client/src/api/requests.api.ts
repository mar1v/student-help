import { api } from "./axios";

export const getRequests = (page?: number, limit?: number, search?: string) =>
  api.get("/requests/", { params: { page, limit, search } });

export const getMyRequests = (page?: number, limit?: number, search?: string) =>
  api.get("/requests/mine", { params: { page, limit, search } });

export const createRequest = (data: {
  title: string;
  subject: string;
  description: string;
}) => api.post("/requests", data);

export const getRequestById = (id: string) => api.get(`/requests/${id}`);

export const updateRequest = (
  id: string,
  data: { title?: string; description?: string; subject?: string },
) => api.patch(`/requests/${id}`, data);

export const respondToRequest = (id: string, message: string) =>
  api.post(`/responses/${id}`, { message });

export const deleteRequest = (id: string) => api.delete(`/requests/${id}`);
