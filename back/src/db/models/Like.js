import { LikeModel } from '../schemas/like';

class Like {
  // like 생성 조회 삭제
  // 다 필요한 듯!
  static async create({ currentUserId, currentTalkId }) {
    const createdNewLike = await LikeModel.create({
      currentUserId,
      currentTalkId,
    });

    return createdNewLike;
  }

  static async findByUserId({ currentUser }) {
    const like = await LikeModel.findOne({
      currentUser,
    });

    return like;
  }

  static async findByTalkId({ talkId }) {
    const like = await LikeModel.findOne({
      talkId,
    }).populate('talkId');
    return like;
  }

  static findManyByUserId({ userId }) {
    return LikeModel.find({ userId }).populate('userId');
  }

  static findManyByTalkId({ talkId }) {
    return LikeModel.find({ talkId }).populate('talkId');
  }

  // 좋아요 삭제
  // static async deleteByUserId({ isLiked }) {
  //   const deleteResult = await LikeModel.deleteOne({
  //     _id: isLiked._id,
  //   });
  //   const isDataDeleted = deleteResult.deletedCount === 1;
  //   return isDataDeleted;
  // }
}

export { Like };
