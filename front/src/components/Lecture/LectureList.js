import { LinkPreview } from '@dhaiwat10/react-link-preview';
// import * as React, {useState} from 'react';
import React from 'react';
import Lottie from 'react-lottie';
import data from './87670-satisfied-bear.json'

import LectureCard2 from './LectureCard2';


function LectureCard({lectureData, myLectureData}) {
    console.log(myLectureData);
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
          <LectureCard2 lectureData={lectureData}></LectureCard2>
          <LectureCard2 lectureData={myLectureData}></LectureCard2>
        </div>
      </div>
    );
  }

export default LectureCard
