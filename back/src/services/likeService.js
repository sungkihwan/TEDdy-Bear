import { Like, User, Talk } from '../db';

// addlike,
class likeService {
  static async addlike({ userId, talkId }) {
    const user = await User.findById({ user_id: userId });
    const talk = await Talk.findOneById({ id: talkId });
    const user_id = user._id;
    const talk_id = talk._id;

    const newLike = { user_id, talk_id, user: userId, talk: talkId };

    const LikeUser = await Like.create({
      newLike,
    });

    return LikeUser;
  }

  // 유저 아이디로 영상 리스트 찾기
  static async getUserLikeList({ userId }) {
    const user = await User.findById({ user_id: userId });
    const user_id = user._id;
    const talklist = await Like.findManyByUserId({ user_id });
    return talklist;
  }

  // 영상 아이디로 유저 리스트 찾기
  static async getTalkLikeList({ talkId }) {
    const talk = await Talk.findOneById({ id: talkId });
    const talk_id = talk._id;
    const userlist = await Like.findManyByTalkId({ talk_id });
    return userlist;
  }

  static async deleteLike({ userId, talkId }) {
    const like = await Like.deleteOneLike({ userId, talkId });
    if (!like) {
      const errorMessage = '이미 취소했습니다';
      return { errorMessage };
    }
    return like;
  }
}

export { likeService };
