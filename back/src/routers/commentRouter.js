import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { CommentService } from "../services/CommentService";

const commentRouter = Router();

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
  
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

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
