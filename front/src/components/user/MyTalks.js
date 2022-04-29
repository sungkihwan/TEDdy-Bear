import React, { useEffect, useState } from "react";
import * as Api from "../../api";
import LectureCard from "../Lecture/LectureCard";
function MyTalks() {
  const [recentLecture, setRecentLecture] = useState([]);

  useEffect(() => {
    Api.get("talks/today", "?size=12").then((res) =>
      setRecentLecture(res.data)
    );
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
    </>
  );
}

export default MyTalks;
