import ResponseModel from "../models/ResponseModel";

export const responseService = {
  add: async (requestId: string, userId: string, message: string) => {
    const doc = await ResponseModel.create({
      request: requestId,
      author: userId,
      message,
    });
    return doc;
  },
};
