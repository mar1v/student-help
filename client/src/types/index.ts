export interface HelpRequest {
  _id: string;
  title: string;
  description?: string;
  subject?: string;
  status?: string;
  author?: {
    _id?: string;
    name?: string;
    email?: string;
  };
  responses?: Array<{
    _id?: string;
    message: string;
    author?: { _id?: string; name?: string };
    createdAt?: string;
  }>;
}
