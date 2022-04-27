import React from 'react';
import Lottie from 'react-lottie';
import data from './87670-satisfied-bear.json'
import LectureCard from './LectureCard';



function LectureList({lectureData, myLectureData}) {

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: data,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
    
    return (
      <div style={{display: 'flex'}}>
        <div>
          <Lottie options={defaultOptions}
                height={350}
                width={300}/>
        </div>
        <div style={{width:'80%', height:500}}>
          <LectureCard lectureData={lectureData} type="TEDdy : 다람쥐야 이건 어때?" cname={"balloon_03"}></LectureCard>
          <LectureCard lectureData={myLectureData} type="추천된 영상" cname={"basic"}></LectureCard>
        </div>
      </div>
    );
  }

export default LectureList;

// 오늘의 영상이 모든 영상에서 랜덤
// 추천된 영상이 내가 추가한 토픽에 대한 영상
