import React, { useContext } from "react";
import LectureCard from "./LectureCard";
import { UserStateContext } from "../../App";

function LectureList({ lectureData, myLectureData }) {
  const userState = useContext(UserStateContext);
  const isLogin = !!userState.user;

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "100%", height: 500 }}>
        <LectureCard lectureData={lectureData} type="오늘의 영상"></LectureCard>
        {isLogin ? (
          <LectureCard
            lectureData={myLectureData}
            type="추천된 영상"
          ></LectureCard>
        ) : (
          <>
            <div>
              <h1
                style={{
                  marginLeft: "20px",
                  verticalAlign: "middle",
                  color: "#795548",
                }}
              >
                오늘의 영상
              </h1>
            </div>
            <div
              style={{
                width: "100%",
                height: 200,
                textAlign: "center",
                verticalAlign: "middle",
              }}
            >
              <h1>로그인이 필요한 서비스입니다.</h1>
            </div>
          </>
        )}
        {isLogin ? (
          <LectureCard
            lectureData={myLectureData}
            type="인기 영상"
          ></LectureCard>
        ) : (
          <>
            <div>
              <h1
                style={{
                  marginLeft: "20px",
                  verticalAlign: "middle",
                  color: "#795548",
                }}
              >
                인기 영상
              </h1>
            </div>
            <div
              style={{
                width: "100%",
                height: 200,
                textAlign: "center",
                verticalAlign: "middle",
              }}
            >
              <h1>로그인이 필요한 서비스입니다.</h1>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LectureList;

// 오늘의 영상이 모든 영상에서 랜덤
// 추천된 영상이 내가 추가한 토픽에 대한 영상
