import { Schema, model } from 'mongoose';

// 곰 캐릭터 mvp
// 뭐가 필요할까?
// 곰 이름, 곰 레벨, 경험치
//level, cotton, height
// cotton ->  level -> height
// 영상을 보면 cotton
const bearSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  bearName: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  cotton: {
    type: Number,
    required: true,
  },
});

const BearModel = model('Bear', BearSchema);

export { BearModel };
