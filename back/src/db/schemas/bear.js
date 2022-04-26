import { Schema, model } from 'mongoose';

// 곰 캐릭터 mvp
// 뭐가 필요할까?
// 곰 이름, 곰 레벨, 경험치
//level, cotton, height
// cotton -> level -> height
//
// 영상을 보면 cotton +1 ? 이건 좀 더 생각
const BearSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  level: {
    type: Number,
    required: true,
    default: 1,
  },
  cotton: {
    type: Number,
    required: true,
    default: 1,
  },
  height: {
    type: Number,
    required: true,
    default: 1,
  },
});

const BearModel = model('Bear', BearSchema);

export { BearModel };
