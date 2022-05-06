import React, { useContext, useEffect, useState } from "react";
import * as Api from "../../api";
import LectureCard from "../Lecture/LectureCard";
import BookmarkCard from "../Lecture/BookMarkCard";
import LikeCard from "../Lecture/LikeCard";
import { UserStateContext } from "../../App";
function MyTalks() {
  const userState = useContext(UserStateContext);
  const [user, setUser] = useState([]);
  const [recentLecture, setRecentLecture] = useState([]);
  const [bookMarkList, setBookMarkList] = useState([]);
  const [likeList, setLikeList] = useState([]);

  useEffect(() => {
    Api.get(`users/${userState.user.id}`).then((res) => setUser(res.data));
    Api.get(`viewhistory/latest`, "?size=10").then((res) => {
      setRecentLecture(res.data.reverse().slice(0, 10));
    });
    Api.get(`bookmarks`).then((res) => {
      setBookMarkList(res.data.payload);
    });
    Api.get(`likes/my`).then((res) => {
      setLikeList(res.data.payload);
    });
  }, []);

  return (
    <>
      <div
        style={{ display: "flex", marginTop: 100, justifyContent: "center" }}
      >
        <div style={{ width: "80%", height: 500 }}>
          <LectureCard
            lectureData={recentLecture}
            user={user}
            type="최근 시청기록"
          ></LectureCard>
        </div>
      </div>
      <div
        style={{ display: "flex", marginTop: 100, justifyContent: "center" }}
      >
        <div style={{ width: "80%", height: 500 }}>
          <BookmarkCard
            lectureData={bookMarkList}
            type="북마크한 영상"
          ></BookmarkCard>
        </div>
      </div>
      <div
        style={{ display: "flex", marginTop: 100, justifyContent: "center" }}
      >
        <div style={{ width: "80%", height: 500 }}>
          <LikeCard lectureData={likeList} type="좋아요한 영상"></LikeCard>
        </div>
      </div>
    </>
  );
}

export default MyTalks;
