import { BookmarkModel } from "../schemas/bookmark";

class Bookmark {
  static findOneByUserId(user_id) {
    return BookmarkModel.findOne({ user_id: user_id });
  }

  static updateOneByUserId(user_id, talks) {
    return BookmarkModel.findOneAndUpdate(
      { user_id: user_id },
      { talks: talks },
      { returnOriginal: false, upsert: true }
    );
  }
  
  static deleteManyByUserId(user_id) { // 회원 탈퇴 시에 모든 북마크 삭제
    return BookmarkModel.deleteOne({ user_id: user_id })
  }
}

export { Bookmark };
