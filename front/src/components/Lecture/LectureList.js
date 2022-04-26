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
                width={350}/>
        </div>
        <div>
          <LectureCard lectureData={lectureData} type="오늘의 영상"></LectureCard>
          <LectureCard lectureData={myLectureData} type="추천된 영상"></LectureCard>
        </div>
      </div>
    );
  }

export default LectureList;
