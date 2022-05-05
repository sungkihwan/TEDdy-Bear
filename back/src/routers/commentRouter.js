import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { CommentService } from "../services/CommentService";

const commentRouter = Router();

/**
 * @swagger
 * paths:
 *  /talks/{talkId}/comments:
 *   get:
 *     summary: "강연 댓글 리스트 조회"
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: talkId
 *         required: true
 *         schema:
 *           type: string
 *         description: talkId (_id가 아님)
 *     responses:
 *       "200":
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 payload:
 *                   $ref: '#/components/schemas/Comment'
 *       "400":
 *          description: 잘못된 요청
 *       "500":
 *          description: 서버 에러
 */
commentRouter.get("/talks/:talkId/comments", async function (req, res, next) {
  try {
    const talkId = Number(req.params.talkId);

    const comments = await CommentService.getComments(talkId);
    if (comments.errorMessage) {
      throw new Error(comments.errorMessage);
    }

    res.status(200).send(comments);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * paths:
 *  /comments/comment:
 *   post:
 *     summary: 강연 댓글 추가
 *     tags: [Comment, Reply]
 *     requestBody:
 *       description: mode(comment댓글, reply대댓글 중에 어떤 종류에 댓글인지), comment(댓글 내용), (댓글인 경우 필요한 데이터 -> ) talkId(댓글이 달릴 강연영상Id), (대댓글인 경우 필요한 데이터 -> ) parentCommentId(대댓글이라면 부모댓글이 될 댓글Id)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mode:
 *                 type: string
 *               talkId:
 *                 type: number
 *               parentCommentId:
 *                 type: string
 *               comment:
 *                 type: string
 *     responses:
 *       "201":
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                  payload:
 *                    $ref: '#/components/schemas/Comment'
 *                  또는 payload:
 *                    $ref: '#/components/schemas/Reply'
 *       "400":
 *          description: 잘못된 요청
 *       "500":
 *          description: 서버 에러
 */
commentRouter.post(
  "/comments/comment",
  login_required,
  async function (req, res, next) {
    try {
      const mode = req.body.mode;
      const userId = req.currentUserId;
      const talkId = Number(req.body.talkId);
      const parentCommentId =
        mode === "reply" ? req.body.parentCommentId : null;
      const comment = req.body.comment;

      let result;
      if (mode === "comment") {
        result = await CommentService.addComment(talkId, comment, userId);
      } else if (mode === "reply") {
        result = await CommentService.addReply(
          parentCommentId,
          comment,
          userId
        );
      }

      if (result.errorMessage) {
        throw new Error(result.errorMessage);
      }

      res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * paths:
 *  /comments/comment:
 *   delete:
 *     summary: 강연 댓글 삭제
 *     tags: [Comment, Reply]
 *     parameters:
 *       - in: path
 *         name: comment_id
 *         required: true
 *         schema:
 *           type: string
 *         description: comment_id
 *       - in: query
 *         name: mode
 *         required: true
 *         schema:
 *           type: string
 *         description: comment댓글, reply대댓글 중에 어떤 종류에 댓글인지
 *     responses:
 *       "200":
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message :
 *                    type: string
 *       "400":
 *          description: 잘못된 요청
 *       "500":
 *          description: 서버 에러
 */
commentRouter.delete(
  "/comments/:comment_id",
  login_required,
  async function (req, res, next) {
    try {
      const mode = req.body.mode;
      const userId = req.currentUserId;
      const comment_id = req.params.comment_id;
      let result;
      if (mode === "comment") {
        result = await CommentService.deleteComment(comment_id, userId);
      } else if (mode === "reply") {
        result = await CommentService.deleteReply(comment_id, userId);
      }

      if (result.errorMessage) {
        throw new Error(result.errorMessage);
      }

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

export { commentRouter };
