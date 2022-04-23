/**
 * View History Service
 *
 * viewHistoryRouter에서 넘어온 정보들로 특정 로직을 구성하여 ViewHistory.js에서 처리 후 viewHistoryRouter로 return
 */

import { ViewHistory } from '../db';
// import { V4 as uuidv4 } from 'uuid';
const { uuid } = require('uuidv4');
class ViewHistoryService {
  // addViewHistory()
  // user_id, viewDate, talkId를 받아서 새로운 award 데이터 생성
  static async addViewHistory({ user_id, talkId, url, title }) {
    const id = uuid();
    const newViewHistory = { user_id, id, talkId, url, title };

    //db에 저장
    const createdNewHistory = await ViewHistory.create({ newViewHistory });
    return createdNewHistory;
  }
  // getViewHistory()
  //   findOneById를 통해 해당 awardId와 같은 Id를 찾아서 데이터 반환
  static async getViewHistory({ viewHistoryId }) {
    const viewHistory = await ViewHistory.findOneById({ viewHistoryId });
    if (!viewHistory) {
      const errorMessage = '해당 id를 가진 시청기록 데이터가 없습니다.';
      return { errorMessage };
    }
    return viewHistory;
  }

  // getViewHistoryList()
  // 전체 viewHistory 반환
  static async getViewHistorylist({ currentUserId, user_id }) {
    const viewHistorylist = await ViewHistory.findManyByUserId({
      currentUserId,
      user_id,
    });
    return viewHistorylist;
  }
}

export { ViewHistoryService };
