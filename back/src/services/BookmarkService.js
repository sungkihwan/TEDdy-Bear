import { Bookmark } from "../db";

class BookmarkService {
  static async getMyBookmark(user_id) {
    return await Bookmark.findOneByUserId(user_id)
  }

  static async addBookmark(user_id, BookmarkdTalk) {
    let myBookmark = this.getMyBookmark(user_id)
    
    if(BookmarkdTalk.talk_id in myBookmark) {
      return { message: "이미 존재하는 북마크입니다."}
    }

    myBookmark[BookmarkdTalk.talk_id] = BookmarkdTalk
    await Bookmark.updateOneByUserId(user_id, myBookmark)
    return { message: "북마크 추가 성공"}
  }

  static async deleteBookmark(user_id, talk_id) {
    let myBookmark = this.getMyBookmark(user_id)
    
    if(talk_id in myBookmark) {
      delete myBookmark[talk_id]
      await Bookmark.updateOneByUserId(user_id, myBookmark)
      return { message: "북마크 삭제 성공"}
    }
    
    return { errorMessage: "이미 존재하지 않는 북마크 입니다."}
  }
}

export { BookmarkService };
