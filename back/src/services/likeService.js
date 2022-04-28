import { Like, User, Talk } from '../db';

// addlike,
class likeService {
  static async addlike({ userId, talkId }) {
    const currentUser = await User.findById({ user_id: userId });
    const currentTalk = await Talk.findOneById({ id: talkId });
    const user_id = currentUser._id;
    const talk_id = currentTalk._id;
    const LikeUser = await Like.create({
      currentUserId: user_id,
      currentTalkId: talk_id,
    });

    return LikeUser;
  }

  static async getUserLikeList({ userId }) {
    const currentUser = await User.findById({ user_id: userId });
    const user_id = currentUser._id;
    const talklist = await Like.findByUserId({ user_id });
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
