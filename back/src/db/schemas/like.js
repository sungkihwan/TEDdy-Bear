import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';
import { User } from '../models/User';

const LikeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      // required: true,
    },
    talkId: {
      type: Schema.Types.ObjectId,
      ref: 'Talk',
      // required: true,
    },
  }
  // {
  //   timestamps: true,
  // }
);

const LikeModel = model('Like', LikeSchema);

export { LikeModel };
