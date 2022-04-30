import { CommentModel } from "../schemas/comment";
import mongoose from "mongoose";

class Comment {
  static findManyByTalkOid(talkOid) {
    return CommentModel.find({ talk: talkOid })
      .populate({ path: "user", select: "name email" })
      .populate({ 
        path: 'reply', select: "comment user createdAt",
        populate: {
          path: 'user', select: "name email"
        } 
     })
      .lean();
  }

  static addOne(talkOid, comment, userOid) {
    return CommentModel.create({
      talk: talkOid,
      user: userOid,
      comment: comment,
    });
  }

  static findOneById(commentId) {
    return CommentModel.findOne({ _id: mongoose.Types.ObjectId(commentId) });
  }

  static updateOne(parentCommentOid, toUpdatedComment) {
    return CommentModel.findOneAndUpdate(
      { _id: parentCommentOid },
      toUpdatedComment,
    );
  }

  static deleteOne(commentId, userOid) {
    return CommentModel.deleteOne({ _id: mongoose.Types.ObjectId(commentId), user: userOid });
  }

}

export { Comment };
