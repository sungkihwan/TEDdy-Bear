import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
  {
    talk: {
      type: Schema.Types.ObjectId,
      ref: "Talk",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reply: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reply",
      },
    ],
  },
  { timestamps: true }
);

const CommentModel = model("Comment", CommentSchema);

export { CommentModel };
