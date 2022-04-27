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
    myTopics: {
      type: Array,
      required: true,
    },
    bearName: {
      type: String,
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
  },
  {
    timestamps: true,
  }
);

const UserModel = model('User', UserSchema);

export { UserModel };
