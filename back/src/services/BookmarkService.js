import { Bookmark, Talk, User } from "../db";

class BookmarkService {
  static async getMyBookmarks(userId) {
    const bookmarks = await Bookmark.findManyByUserId(userId)
    
    if(bookmarks.length === 0) {
      const errorMessage = "북마크가 존재하지 않습니다."
      return { errorMessage }
    }

    const result = {
      message: "북마크 조회 성공",
      payload: bookmarks.reduce((pre, item) => {
        pre[item.talk_id.id] = { ...item.talk_id, bookmark_id: item._id } 
        return pre
      }, {})
    }

    return result
  }

  static async addBookmark(userId, talkId) {
    const talk = await Talk.findOneById({ id: talkId, resultType: "POJO" })
    if(!talk) {
      const errorMessage = "존재하지 않는 강연입니다."
      return { errorMessage }
    }

    const preBookmark = await Bookmark.findOne(userId, talk._id)
    if (preBookmark) {
      const errorMessage = "이미 저장한 북마크 입니다."
      return { errorMessage }
    }

    const newBookmark = await Bookmark.addOne(userId, talk._id)
    if(!newBookmark) {
      const errorMessage = "북마크 추가 실패"
      return { errorMessage }
    }

    return { message: "북마크 추가 성공", payload: { bookmark_id: newBookmark._id } }
  }

  static async deleteBookmark(userId, talk_id) {
    const myBookmark = await Bookmark.deleteOne(userId, talk_id)
    if(myBookmark.deletedCount != 1) {
      const errorMessage = "북마크 삭제 실패"
      return { errorMessage }
    }

    return { message: "북마크 삭제 성공" }
  }
}

export { BookmarkService };
