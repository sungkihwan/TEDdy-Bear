import { CommentModel } from "../schemas/comment";
import mongoose from "mongoose";

class Comment {
  static findManyByTalkId(talk_id) {
    if(typeof(talk_id) !== "object") { talk_id = mongoose.Types.ObjectId(talk_id) }

    return CommentModel.find({ talk: talk_id })
      .populate({ path: "user", select: "name email" })
      .populate({ 
        path: 'reply', select: "comment user createdAt",
        populate: {
          path: 'user', select: "name email"
        } 
      })
      .lean();
  }

  static addOne(talk_id, comment, user_id) {
    if(typeof(talk_id) !== "object") { talk_id = mongoose.Types.ObjectId(talk_id) }
    if(typeof(user_id) !== "object") { user_id = mongoose.Types.ObjectId(user_id) }

    return CommentModel.create({
      talk: talk_id,
      user: user_id,
      comment: comment,
    });
  }

  static findOneById(comment_id) {
    return CommentModel.findOne({ _id: mongoose.Types.ObjectId(comment_id) });
  }

  static updateOne(parentComment_id, toUpdatedComment) {
    if(typeof(parentComment_id) !== "object") { talk_id = mongoose.Types.ObjectId(parentComment_id) }

    return CommentModel.findOneAndUpdate(
      { _id: parentComment_id },
      toUpdatedComment,
    );
  }

  static deleteOne(comment_id, user_id) {
    if(typeof(comment_id) !== "object") { comment_id = mongoose.Types.ObjectId(comment_id) }
    if(typeof(user_id) !== "object") { user_id = mongoose.Types.ObjectId(user_id) }

    return CommentModel.deleteOne({ _id: comment_id, user: user_id });
  }

}

export { Comment };
