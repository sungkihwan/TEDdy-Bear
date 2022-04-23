import React, {useState, useEffect} from 'react';
import LectureCard from './LectureCard'
import * as Api from '../../api';

function Lecture() {
  const [lectureData, setLectureData] = useState([])
  useEffect(() => {
    Api.get('talks/today','?size=3')
      .then(res => setLectureData(res.data));
  }, []);

  return (
    <div style={{marginTop:75}}>
      <LectureCard lectureData={lectureData} setLectureData={setLectureData}></LectureCard>
    </div>
  );
}

export default Lecture;
