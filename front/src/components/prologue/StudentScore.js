import {ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Scatter} from "recharts"
import React, {useEffect, useState} from "react";
import * as Api from '../../api';

function StudentScore() {
    const [studentData, setStudentData] = useState([]);
    
    useEffect(() => {
      Api.get('data', 'student')
        .then(res => setStudentData(() => {
          let newData = [];
          for (let i = 0; i < res.data.data.hours.length; i++) {
            newData.push({x:res.data.data.hours[i], y:res.data.data.scores[i]});
          }
          return newData;
        }));
    }, []);


    return (
      <div
        style={{
          marginTop: 10,
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div>
          <ScatterChart
            width={800}
            height={400}
            margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" name="시간" unit="시간" />
            <YAxis dataKey="y" name="점" unit="점" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Legend />
            <Scatter name="학생 공부시간에 대한 점수 향상" data={studentData} fill="#8884d8" />
          </ScatterChart>
        </div>
        <div>
            <h2>꾸준한 학습을 통해 발전할 수 있다!</h2>
        </div>
      </div>
    );
}

export default StudentScore;