import { LikeModel } from '../schemas/like';

class Like {
  // like 생성 조회 삭제
  // 다 필요한 듯!
  static async create({ newLike }) {
    const createdNewLike = await LikeModel.create(newLike);

    return createdNewLike;
  }

  // static async findByUserId({ currentUser }) {
  //   const like = await LikeModel.findOne({
  //     currentUser,
  //   });

  //   return like;
  // }

  // static async findByTalkId({ talkId }) {
  //   const like = await LikeModel.findOne({
  //     talkId,
  //   }).populate('talkId');
  //   return like;
  // }

  // 유저 아이디로 영상 리스트 찾기
  static findManyByUserId({ user_id }) {
    return LikeModel.find({ user_id });
  }

  // 영상 아이디로 유저 리스트 찾기
  static findManyByTalkId({ talk_id }) {
    return LikeModel.find({ talk_id });
  }

  // 좋아요 삭제
  static findLikeAndDelete({ userId, talkId }) {
    return LikeModel.findOneAndDelete({ user: userId, talk: talkId });
  }
}

export { Like };
