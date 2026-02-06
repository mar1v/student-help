import { Document, Schema, Types, model } from "mongoose";

export interface IResponse extends Document {
  request: Types.ObjectId;
  author: Types.ObjectId;
  message: string;
  createdAt: Date;
}

const ResponseSchema = new Schema<IResponse>({
  request: { type: Schema.Types.ObjectId, ref: "Request", required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<IResponse>("Response", ResponseSchema);
