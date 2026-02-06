import RequestModel from "../models/Request";
import ResponseModel from "../models/ResponseModel";

interface ListOptions {
  page?: number;
  limit?: number;
  subject?: string;
  myUserId?: string;
  search?: string;
  sort?: "date_desc" | "date_asc" | "title_asc" | "title_desc";
}

function escapeRegex(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export const requestService = {
  async getList(opts: ListOptions) {
    const page = opts.page && opts.page > 0 ? opts.page : 1;
    const limit = opts.limit && opts.limit > 0 ? opts.limit : 10;

    let sort = {} as any;
    sort.createdAt = -1;

    if (opts.sort) {
      switch (opts.sort) {
        case "date_desc":
          sort = { createdAt: -1 };
          break;
        case "date_asc":
          sort = { createdAt: 1 };
          break;
        case "title_asc":
          sort = { title: 1 };
          break;
        case "title_desc":
          sort = { title: -1 };
          break;
      }
    }

    const filter: any = {};

    if (opts.subject) {
      filter.subject = opts.subject;
    }

    if (opts.myUserId) {
      filter.author = opts.myUserId;
    }

    if (opts.search && opts.search.trim()) {
      const q = escapeRegex(opts.search.trim());

      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { subject: { $regex: q, $options: "i" } },
      ];
    }

    const [items, total] = await Promise.all([
      RequestModel.find(filter)
        .populate("author", "name email")
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),

      RequestModel.countDocuments(filter),
    ]);

    return {
      items,
      pagination: {
        page,
        limit,
        total,
        pages: Math.max(1, Math.ceil(total / limit)),
      },
    };
  },

  async getById(id: string) {
    const reqDoc = await RequestModel.findById(id)
      .populate("author", "name email")
      .lean();

    if (!reqDoc) return null;

    const responses = await ResponseModel.find({ request: id })
      .populate("author", "name email")
      .lean();

    return { ...reqDoc, responses };
  },

  async create(data: {
    title: string;
    description: string;
    subject: string;
    userId: string;
  }) {
    return RequestModel.create({
      title: data.title,
      description: data.description,
      subject: data.subject,
      author: data.userId,
    });
  },

  async update(
    id: string,
    userId: string,
    data: Partial<{
      title: string;
      description: string;
      subject: string;
    }>,
  ) {
    const doc = await RequestModel.findById(id);
    if (!doc) return null;

    if (doc.author.toString() !== userId) {
      throw new Error("FORBIDDEN");
    }

    if (data.title !== undefined) doc.title = data.title;
    if (data.description !== undefined) doc.description = data.description;
    if (data.subject !== undefined) doc.subject = data.subject;

    await doc.save();
    return doc;
  },

  async delete(id: string, userId: string) {
    const doc = await RequestModel.findById(id);
    if (!doc) return null;

    if (doc.author.toString() !== userId) {
      throw new Error("FORBIDDEN");
    }

    await doc.deleteOne();
    return true;
  },
};
