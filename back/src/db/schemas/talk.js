import { Schema, model } from "mongoose";
/**
 * @swagger
 * tags:
 *   name: Talk
 *   description: 영상 상세정보 조회, 오늘의 영상, 사용자 관심사 추천 영상
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        talk_id:
 *          type: Number
 *        title:
 *          type: string
 *        speakers:
 *          type: string
 *        password:
 *          type: string
 *        author:
 *          type: string
 *        description:
 *          type: string
 *        topics:
 *          type: string
 *        teddy_views:
 *          type: string
 *        teddy_likes:
 *          type: string
 *        url:
 *          type: string
 *        native_lang:
 *          type: string
 *        available_lang:
 *          type: string
 *        published_date:
 *          type: string
 *        duration:
 *          type: string
 * 
 */

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
  { timestamps: true }
);

const TalkModel = model("Talk", TalkSchema);

export { TalkModel };
