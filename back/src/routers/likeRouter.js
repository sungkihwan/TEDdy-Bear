import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { likeService } from '../services/likeService';

const likeRouter = Router();
likeRouter.use(login_required);
/**
 * @swagger
 * tags:
 *   name: Like
 *   description: 좋아요
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Like:
 *      type: object
 *      properties:
 *        user_id:
 *          type: ObjectId
 *        talk_id:
 *          type: ObjectId
 */

/**
 * @swagger
 *
 * /talks/talk/like:
 *  post:
 *    summary: "좋아요 생성"
 *    description: "한 번 누르면 좋아요 생성 다시 누르면 좋아요 삭제"
 *    tags: [Like]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/Like'
 */

// like get, post, delete
likeRouter.post(
  '/talks/talk/like',
  login_required,
  async function (req, res, next) {
    try {
      const userId = req.currentUserId;
      const talkId = Number(req.body.talkId);

      const newLike = await likeService.addlike({ userId, talkId });

      res.status(200).send(newLike);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * paths:
 *  /talks/my:
 *    get:
 *      summary: "좋아요한 동영상 목록 조회"
 *      description: "유저아이디로 좋아요한 talks 목록 조회"
 *      tags: [Like]
 *      responses:
 *        "200":
 *          description: 영상 목록 조회
 *          content:
 *            application/json:
 *              schema:
 *                  $ref: '#components/schemas/Like'
 */
// 유저가 좋아요한 동영상 리스트 가져오기
likeRouter.get('/talk/my', async function (req, res, next) {
  try {
    const userId = req.currentUserId;
    const userLike = await likeService.getUserLikeList({ userId });

    res.status(200).send(userLike);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /userlist/:talkId:
 *  get:
 *    summary: "talk에 좋아요 누른 유저 조회"
 *    description: "talkId로 해당 영상에 좋아요를 누른 유저 목록 조회"
 *    tags: [Like]
 *    parameters:
 *      - in: path
 *        name: talkId
 *        required: true
 *        description: talk Id
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 유저 목록 조회 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/Like'
 */

// 해당 동영상에 좋아요를 누른 유저 리스트 가져오기
likeRouter.get('/userlist/:talkId', async function (req, res, next) {
  try {
    const talkId = Number(req.params.talkId);
    const talkLike = await likeService.getTalkLikeList({ talkId });

    res.status(200).send(talkLike);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /talks/talk/like/:talkId:
 *   delete:
 *    summary: "좋아요 삭제"
 *    description: "한 번 누르면 좋아요 생성 다시 누르면 좋아요 삭제"
 *    tags: [Like]
 *    parameters:
 *      - in: path
 *        name: talkId
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      description: 유저 삭제
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              $ref: '#components/schemas/Like'
 *    responses:
 *      "200":
 *        description: 좋아요 취소 성공
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#components/schemas/Like'
 */

// 좋아요 삭제
likeRouter.delete('/talks/talk/like/:talkId', async function (req, res, next) {
  try {
    const userId = req.currentUserId;
    const talkId = Number(req.params.talkId);

    const result = await likeService.deleteLike({ userId, talkId });

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

export { likeRouter };
