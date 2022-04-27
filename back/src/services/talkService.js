import { Talk, Topic, User } from '../db';

class talkService {
  static async getTalk({ id }) {
    const talk = await Talk.findOneById({ id });
    if (!talk) {
      const errorMessage = '영상 조회에 실패하였습니다.';
      return { errorMessage };
    }

    return talk;
  }

  // static async getTalks({ perPage, page }) {
  //     const talks = await Talk.findAll({ perPage, page })
  //     return talks
  // }

  static async getTodayTalk({ size }) {
    // 주제를 랜덤으로 선정 -> 각 주제별로 영상 1개씩 선정
    const randomTopics = await Topic.findManyRandom(size);
    if (randomTopics.length === 0) {
      const errorMessage = '주제 조회에 실패하였습니다.';
      return { errorMessage };
    }

    let topics = [];
    for (let i = 0; i < randomTopics.length; i++) {
      topics.push(Object.keys(randomTopics[i])[1]);
    }

    const randomTalks = await Talk.findManyRandom(topics, size);
    if (randomTalks.length === 0) {
      const errorMessage = '영상 조회에 실패하였습니다.';
      return { errorMessage };
    }

    return randomTalks;
  }

  static async getMyTalk({ size, user_id }) {
    const { myTopics } = await User.findById({ user_id });
    if (!myTopics) {
      const errorMessage = '주제 조회에 실패하였습니다.';
      return { errorMessage };
    }

    const myTalk = await Talk.findManyRandom(myTopics, size);
    if (myTalk.length === 0) {
      const errorMessage = '영상 조회에 실패하였습니다.';
      return { errorMessage };
    }

    return myTalk;
  }
}

export { talkService };
