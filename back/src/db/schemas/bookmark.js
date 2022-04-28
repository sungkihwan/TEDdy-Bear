import { Schema, model } from "mongoose";

/**
 * @swagger
 * tags:
 *   name: Bookmark
 *   description: 북마크 스키마
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    BookmarkedTalk:
 *      type: object
 *      properties:
 *        talk_id:
 *          type: number
 *        title:
 *          type: string
 *        speakers:
 *          type: array
 *          items:
 *            type: string
 *        description:
 *          type: string
 *        url:
 *          type: string
 */
const BookmarkedTalkSchema = new Schema({
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
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  }
})

/**
 * @swagger
 * components:
 *  schemas:
 *    Bookmark:
 *      type: object
 *      properties:
 *        user_id:
 *          type: string
 *        talks:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/BookmarkedTalk'
 */

const BookmarkSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
      ref: "User",
    },
    talks: [ BookmarkedTalkSchema ],
  },
  {
    timestamps: true,
  }
);

const BookmarkModel = model("Bookmark", BookmarkSchema);

export { BookmarkModel };
