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

  static async getUserLikeList({ userId }) {
    const user = await User.findById({ user_id: userId });
    const user_id = user._id;
    const talklist = await Like.findManyByUserId({ userId: user_id });
    return talklist;
  }

  static async getTalkLikeList({ talkId }) {
    const currentTalk = await Talk.findOneById({ id: talkId });
    const talk_id = currentTalk._id;
    const userlist = await Like.findManyByTalkId({ currentUser: talk_id });
    return userlist;
  }
}

export { likeService };
