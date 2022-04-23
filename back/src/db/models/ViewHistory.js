/**
 * 시청 기록 모델, 서비스에서 필요한 데이터 처리 관련 코드 작성
 *
 * 시청 기록 생성, 조회, 수정
 */

// 언제 시청 기록이 생성되나?
// 동영상 링크를 클릭했을 때!
// 기록하는 정보는 user_id, talkId, url, title
// 일단 클릭할 때마다 view history를 남겨놓고 나중에 viewDate가 같은 것끼리 묶어서 날짜별로 관리를 한다.
// 그러면?
// 생성, 조회만 필요
// 수정, 삭제는 필요없음

import { ViewHistoryModel } from '../schemas/viewHistory';

class ViewHistory {
  // create() : 새로운 시청기록에 대한 정보를 db에 만들고 return
  static async create({ newViewHistory }) {
    return ViewHistoryModel.create(newViewHistory);
  }

  // findOneById() : db에서 viewHistoryId와 같은 document 하나의 객체를 return
  static async findOneById({ viewHistoryId }) {
    return ViewHistoryModel.findOne({ id: viewHistoryId });
  }

  // findManyByUserId() : 모든 시청기록 가져오기
  static async findManyByUserId({ user_id }) {
    return ViewHistoryModel.find({ user_id });
  }
}

export { ViewHistory };
