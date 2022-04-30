import { Talk, Comment, Reply, User } from "../db";

class CommentService {
  static async getComments(talkId) {
    const talk = await Talk.findOneById({ id: talkId })
    if(!talk) {
      const errorMessage = "존재하지 않는 강연입니다."
      return { errorMessage }
    }
    
    const talkOid = talk._id
    const comments = await Comment.findManyByTalkOid(talkOid)
    if(comments.length === 0) {
      return { message: "아직 작성된 댓글이 없습니다." }
    }

    const result = {
      length: comments.length,
      comments: comments
    }
    return result
  }

  static async addComment(talkId, comment, userId) {
    const talk = await Talk.findOneById({ id: talkId })
    if(!talk) {
      const errorMessage = "존재하지 않는 강연입니다."
      return { errorMessage }
    }
    
    const user = await User.findById({ user_id: userId })
    if(!user) {
      const errorMessage = "존재하지 않는 사용자입니다."
      return { errorMessage }
    }
    
    const newComment = await Comment.addOne(talk._id, comment, user._id)
    if (!newComment) {
      const errorMessage = "댓글 작성 실패"
      return { errorMessage }
    }
    
    return { message: "댓글 작성 성공", newComment}
  }

  static async addReply(parentCommentId, comment, userId) {
    // 존재하는 부모댓글인지 확인
    let parentComment = await Comment.findOneById(parentCommentId)
    if(!parentComment) {
      const errorMessage = "존재하지 않는 댓글에 대댓글을 달 수 없습니다."
      return { errorMessage }
    }

    // 작성자 _id 조회
    const user = await User.findById({ user_id: userId })
    if(!user) {
      const errorMessage = "존재하지 않는 사용자입니다."
      return { errorMessage }
    }

    // 대댓글 생성
    const reply = await Reply.addOne(parentComment._id, comment, user._id)
    if (!reply) {
      const errorMessage = "대댓글 작성 실패"
      return { errorMessage }
    }
    
    // 부모댓글에 대댓글 정보 추가해서 업데이트
    parentComment.reply.push(reply._id)
    const updatedComment = await Comment.updateOne(parentComment._id, parentComment)
    if (!updatedComment) {
      const errorMessage = "댓글에 대댓글 업데이트 실패"
      return { errorMessage }
    }

    return { message: "대댓글 작성 성공", reply }
  }

  static async deleteComment(commentId, userId) {
    // 작성자 _id 조회
    const user = await User.findById({ user_id: userId })
    if(!user) {
      const errorMessage = "존재하지 않는 사용자입니다."
      return { errorMessage }
    }

    const result = await Comment.deleteOne(commentId, user._id)
    if(result.deletedCount != 1) {
      const errorMessage = "댓글 삭제 실패"
      return { errorMessage }
    }

    return { message: "댓글 삭제 성공"}
  }

  static async deleteReply(commentId, userId) {
    // 작성자 _id 조회
    const user = await User.findById({ user_id: userId })
    if(!user) {
      const errorMessage = "존재하지 않는 사용자입니다."
      return { errorMessage }
    }

    const result = await Reply.deleteOne(commentId, user._id)

    if(result.deletedCount != 1) {
      const errorMessage = "대댓글 삭제 실패"
      return { errorMessage }
    }

    return { message: "대댓글 삭제 성공"}
  }
}

export { CommentService };
