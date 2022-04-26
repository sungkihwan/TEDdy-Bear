import React, {useState, useEffect} from 'react';
import * as Api from '../../api';
import LectureList from './LectureList'
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
      <LectureList lectureData={lectureData} myLectureData={myLectureData} setLectureData={setLectureData}></LectureList>
    </div>
  );
}

export default Lecture;
