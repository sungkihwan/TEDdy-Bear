import React, { useState, useEffect, useContext } from "react";
import * as Api from "../../api";
import LectureList from "./LectureList";
import { UserStateContext } from "../../App";
function Lecture() {
  const [lectureData, setLectureData] = useState([]);
  const [myLectureData, setMyLectureData] = useState([]);
  const [rankLectureData, setRankLectureData] = useState([]);
  const userState = useContext(UserStateContext);
  useEffect(() => {
    Api.get("talks/today", "?size=12").then((res) => setLectureData(res.data));
    if (userState.user !== null) {
      if (userState.user.myTopics.length !== 0) {
        Api.get("talks/my", "?size=12").then((res) => {
          setMyLectureData(res.data);
        });
      }
      Api.get("talks/like/ranking", "?size=12").then((res) => {
        setRankLectureData(res.data);
      });
    }
  }, [userState.user]);

  return (
    <div style={{ marginTop: 75 }}>
      <LectureList
        lectureData={lectureData}
        myLectureData={myLectureData}
        rankLectureData={rankLectureData}
      ></LectureList>
    </div>
  );
}

export default Lecture;
