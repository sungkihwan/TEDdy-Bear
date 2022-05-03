/*
 * bear (mypage) 기능 schema 정의
 */

// 필요한 데이터
// 시청 날짜

import { Schema, model } from 'mongoose';

const viewHistorySchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    talkId: {
      type: String,
      required: true,
    },
<<<<<<< HEAD
=======
    url: {
      type: String,
      required: true,
    },
>>>>>>> 0def5e0fa8d313a09fc1493a17fe7dc4134d8797
  },
  {
    timestamps: true,
  }
);

const ViewHistoryModel = model('ViewHistory', viewHistorySchema);

export { ViewHistoryModel };
