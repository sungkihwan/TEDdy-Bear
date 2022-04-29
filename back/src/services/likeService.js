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
    console.log('hi');
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

  // 영상 아이디, 유저 아이디로 리스트 삭제하기
  static async deleteLike({ userId, talkId }) {
    const isLiked = await Like.findLikeAndDelete({ userId, talkId });

    if (!isLiked) {
      const errorMessage = '이미 취소했습니다';
      return { errorMessage };
    }

    return { status: 'ok' };
  }

  // 한 번 누르면 -> 영상아이디, 유저 아이디 객체 생성
  // 이미 객체가 있으면 -> 객체 삭제

  static async setLike({ userId, talkId }) {
    const user = await User.findById({ user_id: userId });
    const talk = await Talk.findOneById({ id: talkId });
    const user_id = user._id;
    const talk_id = talk._id;

    const isLiked = await Like.findBoth({ user_id, talk_id });

    if (isLiked) {
      return await Like.deleteOneLike({ isLiked });
    } else {
      const newLike = { user_id, talk_id, user: userId, talk: talkId };

      const LikeUser = await Like.create({
        newLike,
      });
      return LikeUser;
    }
  }
}

export { likeService };
