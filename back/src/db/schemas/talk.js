import { Schema, model } from "mongoose";

const TalkSchema = new Schema(
  {
    talk_id: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    speakers: {
      type: Array,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    topics: {
      type: Array,
      required: true,
    },
    teddy_views: {
      type: Number,
      required: true,
    },
    teddy_likes: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    native_lang: {
      type: Array,
      required: true,
    },
    available_lang: {
      type: Array,
      required: true,
    },
    published_date: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: false,
    },
    // related_talks: {
    //   type: Array,
    //   required: true,
    // },
  },
  { timestamps: true, collection: "talk" }
);

const TalkModel = model("Talk", TalkSchema);

export { TalkModel };
