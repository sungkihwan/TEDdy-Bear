import { Schema, model } from "mongoose";

const ReplySchema = new Schema(
  {
    parentComment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
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
  },
  {
    timestamps: true,
  }
);

const ReplyModel = model("Reply", ReplySchema);

export { ReplyModel };
