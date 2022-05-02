import React, { useContext, useEffect, useState } from "react";
import * as Api from "../../api";
import { UserStateContext } from "../../App";
import LectureCard from "../Lecture/LectureCard";
function MyTalks() {
  const userId = useContext(UserStateContext).user.id;
  const [recentLecture, setRecentLecture] = useState([]);
  const [bookMarkList, setBookMarkList] = useState([]);

  useEffect(() => {
    Api.get("talks/today", "?size=12").then((res) => {
      setRecentLecture(res.data);
      console.log(res.data);
    });
    Api.get(`bookmarks/${userId}`).then((res) => {
      setBookMarkList(res.data.bookmarks);
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
            type="최근 시청기록"
          ></LectureCard>
        </div>
      </div>
      <div
        style={{ display: "flex", marginTop: 100, justifyContent: "center" }}
      >
        <div style={{ width: "80%", height: 500 }}>
          <LectureCard
            lectureData={bookMarkList}
            type="북마크한 영상"
          ></LectureCard>
        </div>
      </div>
    </>
  );
}

export default MyTalks;
