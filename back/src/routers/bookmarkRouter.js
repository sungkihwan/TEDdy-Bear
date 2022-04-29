import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { BookmarkService } from "../services/BookmarkService";

const bookmarkRouter = Router();

/**
 * @swagger
 * paths:
 *  /bookmarks/{id}:
 *   get:
 *     summary: "user_id로 북마크 조회"
 *     tags: [Bookmark]
 *     parameters:
 *       - in: path
 *         name: id   
 *         required: true
 *         schema:
 *           type: string
 *         description: userId
 *     responses:
 *       "200":
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bookmark'
 *       "400":
 *          description: 잘못된 요청
 *       "500":
 *          description: 서버 에러
 */
bookmarkRouter.get("/bookmarks/:id", login_required, async function (req, res, next) {
  try {
    const userId = req.currentUserId

    const bookmarks = await BookmarkService.getMyBookmarks(userId);
    if (bookmarks.errorMessage) {
      throw new Error(bookmarks.errorMessage)
    }

    res.status(200).send(bookmarks);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * paths:
 *  /bookmarks/{id}:
 *   post:
 *     summary: 강연 북마크 추가
 *     tags: [Bookmark]
 *     parameters:
 *       - in: path
 *         name: id   
 *         required: true
 *         schema:
 *           type: string
 *         description: userId
 *     requestBody:
 *       description: 강연 Id
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               talkId:
 *                 type: number
 *     responses:
 *       "201":
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  length:
 *                    type: number
 *                  bookmarks:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Talk'
 *       "400":
 *          description: 잘못된 요청
 *       "500":
 *          description: 서버 에러
 */
bookmarkRouter.post("/bookmarks/:id", login_required, async function (req, res, next) {
  try {
    const userId = req.currentUserId
    const talkId = Number(req.body.talkId)

    const bookmarks = await BookmarkService.addBookmark(userId, talkId);
    if (bookmarks.errorMessage) {
      throw new Error(bookmarks.errorMessage)
    }

    res.status(201).send(bookmarks);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * paths:
 *  /bookmarks/{id}:
 *   delete:
 *     summary: 강연 북마크 삭제
 *     tags: [Bookmark]
 *     parameters:
 *       - in: path
 *         name: id   
 *         required: true
 *         schema:
 *           type: string
 *         description: user_id
 *     requestBody:
 *       description: 강연 Id
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               talkId:
 *                 type: number
 *     responses:
 *       "200":
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       "400":
 *          description: 잘못된 요청
 *       "500":
 *          description: 서버 에러
 */
bookmarkRouter.delete("/bookmarks/:id", login_required, async function (req, res, next) {
  try {
    const userId = req.currentUserId
    const talkId = Number(req.body.talkId)

    const bookmark = await BookmarkService.deleteBookmark(userId, talkId);
    if (bookmark.errorMessage) {
      throw new Error(bookmark.errorMessage)
    }

    res.status(200).send(bookmark);
  } catch (error) {
    next(error);
  }
});

export { bookmarkRouter };
