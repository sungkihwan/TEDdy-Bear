import React from 'react';
import LectureCard from './LectureCard';



function LectureList({lectureData, myLectureData}) {
    
    return (
      <div style={{display: 'flex'}}>
        <div style={{width:'100%', height:500}}>
          <LectureCard lectureData={lectureData} type="추천된 영상"></LectureCard>
          <LectureCard lectureData={myLectureData} type="오늘의 영상" ></LectureCard>
          <LectureCard lectureData={myLectureData} type="인기 영상" ></LectureCard>
        </div>
      </div>
    );
  }

export default LectureList;

// 오늘의 영상이 모든 영상에서 랜덤
// 추천된 영상이 내가 추가한 토픽에 대한 영상
