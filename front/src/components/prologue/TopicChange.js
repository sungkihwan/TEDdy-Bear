import {LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line} from "recharts"
import React, {useEffect, useState} from "react";
import * as Api from '../../api';

function TopicChange() {
    const [topicTrend, setTopicTrend] = useState([]);
    const makeYear = (i) => {
      if (6 + i < 10) {
        return `200${6 + i}년`;
      }
      else {
        return `20${6 + i}년`;
      }

    }
    useEffect(() => {
        Api.get('data', 'top5topicTrend')
          .then(res => setTopicTrend(() => {
              const newData = [];
              const {data, keys} = res.data;

              let year = ''
              
              for (let i = 0; i < data[keys[0]].length; i++) {
                  year = makeYear(i);
                  newData.push({
                      name : year,
                      [keys[0]] : data[keys[0]][i],
                      [keys[1]] : data[keys[1]][i],
                      [keys[2]] : data[keys[2]][i],
                      [keys[3]] : data[keys[3]][i],
                      [keys[4]] : data[keys[4]][i],
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