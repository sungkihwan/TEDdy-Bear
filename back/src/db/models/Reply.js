import { ReplyModel } from "../schemas/reply";
import mongoose from "mongoose";

class Reply {
  static addOne(parentCommentOid, comment, userOid) {
    return ReplyModel.create({
      parentComment: parentCommentOid,
      user: userOid,
      comment: comment,
    });
  }

  static deleteOne(commentId, userOid) {
    return ReplyModel.deleteOne({ _id: mongoose.Types.ObjectId(commentId), user: userOid });
  }

}

export { Reply };
