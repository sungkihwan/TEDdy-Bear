import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { BookmarkService } from "../services/BookmarkService";

const bookmarkRouter = Router();

/**
 * @swagger
 * paths:
 *  /bookmarks:
 *   get:
 *     summary: "JWT user_id로 북마크 조회"
 *     tags: [Bookmark]
 *     responses:
 *       "200":
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 bookmarks:
 *                   type: object
 *                   properties:
 *                     talkId:
 *                       type: object
 *                       properties:
 *                         title:
 *                           type: string
 *                         ...topic강연 정보들:
 *                           type: string
 *                         bookmark_id:
 *                           type: string
 * 
 *       "400":
 *          description: 잘못된 요청
 *       "500":
 *          description: 서버 에러
 */
bookmarkRouter.get("/bookmarks", login_required, async function (req, res, next) {
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
 *  /bookmarks/bookmark:
 *   post:
 *     summary: 강연 북마크 추가
 *     tags: [Bookmark]
 *     requestBody:
 *       description: JWT user_id, 강연 Id으로 북마크 추가
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
 *                  message:
 *                    type: string
 *                  bookmarkId:
 *                    type: string
 *       "400":
 *          description: 잘못된 요청
 *       "500":
 *          description: 서버 에러
 */
bookmarkRouter.post("/bookmarks/bookmark", login_required, async function (req, res, next) {
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
 *  /bookmarks/{bookmark_id}:
 *   delete:
 *     summary: 강연 북마크 삭제
 *     tags: [Bookmark]
 *     parameters:
 *       - in: path
 *         name: bookmark_id   
 *         required: true
 *         schema:
 *           type: string
 *         description: bookmark_id
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
bookmarkRouter.delete("/bookmarks/:bookmark_id", login_required, async function (req, res, next) {
  try {
    const userId = req.currentUserId
    const bookmark_id = req.params.bookmark_id

    const bookmark = await BookmarkService.deleteBookmark(userId, bookmark_id);
    if (bookmark.errorMessage) {
      throw new Error(bookmark.errorMessage)
    }

    res.status(200).send(bookmark);
  } catch (error) {
    next(error);
  }
});

export { bookmarkRouter };
