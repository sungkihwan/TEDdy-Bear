import React, {useState, useEffect} from 'react';
import LectureCard from './LectureCard'
import * as Api from '../../api';

function Lecture() {
  const [lectureData, setLectureData] = useState([]);
  const [myLectureData, setMyLectureData] = useState([]);

  useEffect(() => {
    Api.get('talks/today','?size=3')
      .then(res => setLectureData(res.data));
    Api.post('talks/my', {size:3})
      .then(res => setMyLectureData(res.data));
  }, []);
  return (
    <div style={{marginTop:75}}>
      <LectureCard lectureData={lectureData} myLectureData={myLectureData} setLectureData={setLectureData}></LectureCard>
    </div>
  );
}

export default Lecture;
