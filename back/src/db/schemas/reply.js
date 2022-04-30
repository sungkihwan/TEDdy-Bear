import { Schema, model } from "mongoose";

/**
 * @swagger
 * tags:
 *   name: Reply
 *   description: 대댓글 스키마
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Reply:
 *      type: object
 *      properties:
 *        parentComment:
 *          type: string
 *        user:
 *          type: string
 *        comment:
 *          type: string
 */

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
