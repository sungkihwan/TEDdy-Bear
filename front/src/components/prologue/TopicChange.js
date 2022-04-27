import {LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line} from "recharts"
import React, {useEffect, useState} from "react";
import * as Api from '../../api';

function TopicChange() {
    const [topicTrend, setTopicTrend] = useState([]);

    useEffect(() => {
        Api.get('data', 'top5topicTrend')
          .then(res => setTopicTrend(() => {
              const newData = [];
              const str0 = res.data.keys[0];
              const str1 = res.data.keys[1];
              const str2 = res.data.keys[2];
              const str3 = res.data.keys[3];
              const str4 = res.data.keys[4];
              let year = ''
              
              for (let i = 0; i < res.data.data[str0].length; i++) {
                  year = '';
                  if (6 + i < 10) {
                    year = `200${6 + i}년`;
                  }
                  else {
                    year = `20${6 + i}년`;
                  }
                  newData.push({
                      name : year,
                      [str0] : res.data.data[str0][i],
                      [str1] : res.data.data[str1][i],
                      [str2] : res.data.data[str2][i],
                      [str3] : res.data.data[str3][i],
                      [str4] : res.data.data[str4][i],
                  })
              }
            return newData;
          }))
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
            <h2>현재 Top 5 주제의 변화율</h2>
        </div>
        <div style={{ border: "2px solid black" }}>
          <LineChart
            width={800}
            height={400}
            data={topicTrend}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="science" stroke="#f44336" />
            <Line type="monotone" dataKey="culture" stroke="#3f51b5" />
            <Line type="monotone" dataKey="technology" stroke="#009688" />
            <Line type="monotone" dataKey="animation" stroke="#212121" />
            <Line type="monotone" dataKey="business" stroke="#795548" />
          </LineChart>
        </div>
      </div>
    );
}

export default TopicChange;