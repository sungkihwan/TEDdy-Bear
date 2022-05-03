import React, { useState, useEffect, useContext } from "react";
import * as Api from "../../api";
import LectureList from "./LectureList";
import { UserStateContext } from "../../App";
function Lecture() {
  const [lectureData, setLectureData] = useState([]);
  const [myLectureData, setMyLectureData] = useState([]);
  const userState = useContext(UserStateContext);
  useEffect(() => {
    Api.get("talks/today", "?size=12").then((res) => setLectureData(res.data));

    if (userState.user.myTopics.length !== 0) {
      Api.post("talks/my", { size: 12 }).then((res) =>
        setMyLectureData(res.data)
      );
    }
  }, [userState.user.myTopics]);

  console.log(myLectureData);

  return (
    <div style={{ marginTop: 75 }}>
      <LectureList
        lectureData={lectureData}
        myLectureData={myLectureData}
        setLectureData={setLectureData}
      ></LectureList>
    </div>
  );
}

export default Lecture;
