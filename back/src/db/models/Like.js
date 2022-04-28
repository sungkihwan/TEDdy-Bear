import { LikeModel } from '../schemas/like';

class Like {
  // like 생성 조회 수정 삭제
  // 다 필요한 듯!

  // 좋아요 생성
  // 좋아요 버튼 클릭 시 클릭한 user와 talk의 like 객체 생성
  static async create({ currentUserId, currentTalkId }) {
    const createdNewLike = await LikeModel.create({
      currentUserId,
      currentTalkId,
    });
    return createdNewLike;
  }

  // 좋아요 버튼을 클릭한 user와 좋아요를 받은 user의 like 객체가 LikeModel 안에 있다면 like 객체 반환 아니면 null 반환
  static async findByUserId({ currentUser, currentTalkId }) {
    const like = await LikeModel.findOne({
      $and: [{ currentUser }, { currentTalkId }],
    });
    return like;
  }

  // 좋아요 삭제
  static async deleteByUserId({ isLiked }) {
    const deleteResult = await LikeModel.deleteOne({
      _id: isLiked._id,
    });
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }

  // userId로 좋아요 누른 talk 리스트 찾기
  static findManyByUserId({ userId }) {
    return LikeModel.find({ userId });
  }

  // talk 아이디로 전체 조회
  static findManyByTalkId({ talkId }) {
    return LikeModel.find({ talkId });
  }
}

export { Like };
