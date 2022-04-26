import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    bearName: {
      type: String,
      required: true,
    },
    myTopics: {
      type: Array,
      required: true,
    },
    bearId: {
      type: Schema.Types.ObjectId,
      ref: 'Bear',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model('User', UserSchema);

export { UserModel };
