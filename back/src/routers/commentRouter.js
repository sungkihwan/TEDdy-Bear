import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { CommentService } from "../services/CommentService";

const commentRouter = Router();

/**
 * @swagger
 * paths:
 *  /talks/:talkId/comments:
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
 *                 length:
 *                   type: string
 *                 comments:
 *                   $ref: '#/components/schemas/Comment'
 *       "400":
 *          description: 잘못된 요청
 *       "500":
 *          description: 서버 에러
 */
commentRouter.get("/talks/:talkId/comments", async function (req, res, next) {
  try {
    const talkId = Number(req.params.talkId)

    const comments = await CommentService.getComments(talkId);
    if (comments.errorMessage) {
      throw new Error(comments.errorMessage)
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
 *       description: mode(comment댓글, reply대댓글 중에 어떤 종류에 댓글인지), talkId(댓글이 달릴 강연영상Id), parentCommentId(대댓글이라면 부모댓글이 될 댓글Id), comment(댓글 내용)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mode:
 *                 type: string
 *               talkId:
 *                 type: string
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
 *                  reply:
 *                    $ref: '#/components/schemas/Reply'
 *                  또는 comment:
 *                    $ref: '#/components/schemas/Comment'
 *       "400":
 *          description: 잘못된 요청
 *       "500":
 *          description: 서버 에러
 */
commentRouter.post("/comments/comment", login_required, async function (req, res, next) {
  try {
    const mode = req.body.mode
    const userId = req.currentUserId
    const talkId = Number(req.body.talkId)
    const parentCommentId = mode === 'reply' ? req.body.parentCommentId : null
    const comment = req.body.comment
    
    let result
    if(mode === 'comment') {
      result = await CommentService.addComment(talkId, comment, userId)
    } else if(mode === 'reply') {
      result = await CommentService.addReply(parentCommentId, comment, userId)
    }
    
    if(result.errorMessage) {
      throw new Error(result.errorMessage)
    }
  
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * paths:
 *  /comments/comment:
 *   delete:
 *     summary: 강연 댓글 삭제
 *     tags: [Comment, Reply]
 *     requestBody:
 *       description: mode(comment댓글, reply대댓글 중에 어떤 종류에 댓글인지), commentId(삭제할 댓글 Id)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mode:
 *                 type: string
 *               commentId:
 *                 type: string
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
commentRouter.delete("/comments/comment", login_required, async function (req, res, next) {
  try {
    const mode = req.body.mode
    const userId = req.currentUserId
    const commentId = req.body.commentId
    
    let result
    if(mode === 'comment') {
      result = await CommentService.deleteComment(commentId, userId);
    } else if(mode === 'reply') {
      result = await CommentService.deleteReply(commentId, userId);
    }
    
    if (result.errorMessage) {
      throw new Error(result.errorMessage)
    }
  
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

export { commentRouter };
