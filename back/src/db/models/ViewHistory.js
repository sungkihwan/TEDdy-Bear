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

  // createAt으로 4달 전까지의 데이터 찾아서 보내기
  static async findManyByCreatedAt({ user_id, size }) {
    const userViewHistorylist = ViewHistoryModel.find({ user_id });
    const dateBefore = new Date();
    const now = new Date();
    dateBefore.setMonth(now.getMonth() - size);

    return userViewHistorylist.find({
      createdAt: {
        $gte: dateBefore,
        $lte: now,
      },
    });
  }

  static async latest5({ user_id, size }) {
    const latest5 = ViewHistoryModel.aggregate([
      {
        $match: { user_id: user_id },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $limit: size,
      },
      {
        $group: {
          _id: '$url',
        },
      },
    ]);

    return latest5;
  }

  // 랭킹보드 쿼리로 조회
  // 성능 문제가 생기면 user_id : count 형식으로 데이터를 따로 저장하고 count에 index를 설정해서 자동 정렬되게끔 설정
  static async rankingBoard({}) {
    const aggregatorOpts = [
      {
        $group: {
          _id: '$user_id',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ];

    return await ViewHistoryModel.aggregate(aggregatorOpts).limit(5).exec();
  }
}

export { ViewHistory };
