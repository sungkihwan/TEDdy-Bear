import { Schema, model } from 'mongoose';

const LikeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    talkId: {
      type: Schema.Types.ObjectId,
      ref: 'Talk',
    },
  },
  {
    timestamps: true,
  }
);

const LikeModel = model('Data', LikeSchema);

export { LikeModel };
