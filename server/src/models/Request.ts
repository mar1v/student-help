import { Schema, Types, model } from "mongoose";

export interface IRequest {
  title: string;
  description?: string;
  subject: string;
  author: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const RequestSchema = new Schema<IRequest>(
  {
    title: { type: String, required: true },
    description: { type: String },
    subject: { type: String, required: true, index: true },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model<IRequest>("Request", RequestSchema);
