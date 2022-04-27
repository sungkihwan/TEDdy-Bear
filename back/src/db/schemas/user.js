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
      immutable: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: function () {
        return this.infoProvider === 'User';
      },
    },
    myTopics: {
      type: Array,
      required: true,
    },
    bearName: {
      type: String,
      default: 'Teddy',
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
      default: 10,
    },
    sex: {
      type: String,
      required: false,
    },
    occupation: {
      type: String,
      required: false,
    },
    myTopics: {
      type: Array,
      default: [],
    },
    infoProvider: {
      type: String,
      enum: {
        values: ["User", "Google"],
        message: "{VALUE} 로 로그인하기는 아직 지원되지 않습니다.",
      },
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model('User', UserSchema);

export { UserModel };
