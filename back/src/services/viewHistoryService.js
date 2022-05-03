/**
 * View History Service
 *
 * viewHistoryRouter에서 넘어온 정보들로 특정 로직을 구성하여 ViewHistory.js에서 처리 후 viewHistoryRouter로 return
 */

import { ViewHistory } from '../db';
import { v4 as uuidv4 } from 'uuid';
import { utils } from './utils';
import { TalkService } from './talkService';

class ViewHistoryService {
  // addViewHistory()
  // user_id, talkId, url, title를 받아서 새로운 viewHistory 추가
  static async addViewHistory({ user_id, talkId }) {
    const id = uuidv4();
    const newViewHistory = { user_id, id, talkId };

    // view 카운드 올리기
    if(await TalkService.updateView(talkId) === false) {
      console.log('조회수 업데이트 실패')
    }

    //db에 저장
    const createdNewHistory = await ViewHistory.create({ newViewHistory });
    return createdNewHistory;
  }

  // getViewHistory()
  // viewHistoryId로 viewHistory 찾기
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

  //getViewHistoryDate()
  // 날짜별로 동영상 기록 조회
  static async getViewHistoryDate({ currentUserId, user_id, date }) {
    // date랑 createdAt이랑 비교해서 날짜가 같으면 list로 return
    // 해당 유저의 전체 리스트
    const viewhistorylist = await ViewHistory.findManyByUserId({
      currentUserId,
      user_id,
    });

    let formatDate = 0;
    let viewhistoryDatelist = [];

    for (var i in viewhistorylist) {
      const createdAt =
        viewhistorylist[Object.keys(viewhistorylist)[i]].createdAt;
      formatDate = utils.makeDateToString(createdAt);

      if (formatDate == date) {
        viewhistoryDatelist.push(viewhistorylist[i]);
      }
    }
    return viewhistoryDatelist;
  }

  static async getViewHistoryUntilToday({ user_id }) {
    return await ViewHistory.findManyByCreatedAt({ user_id });
  }

  static async getLatest5({ user_id }) {
    return await ViewHistory.latest5({ user_id });
  }

  static async rankingBoard({}) {
    return await ViewHistory.rankingBoard({});
  }
}

export { ViewHistoryService };
