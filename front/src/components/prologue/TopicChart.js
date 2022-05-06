import React, {useEffect, useState} from "react";
import ReactWordcloud from "react-wordcloud";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import * as Api from '../../api';

const options = {
  colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
  enableTooltip: true,
  deterministic: false,
  fontFamily: "impact",
  fontSizes: [5, 100],
  fontStyle: "normal",
  fontWeight: "normal",
  padding: 1,
  rotations: 3,
  rotationAngles: [0, 90],
  scale: "sqrt",
  spiral: "archimedean",
  transitionDuration: 1000
};


function TopicChart() {
    const [topicLike, setTopicLike] = useState([])
    useEffect(() => {
        Api.get('data', 'topicLikes')
          .then(res => setTopicLike(() => {
              const newData = []
              const {data} = res.data;
              for (let i = 0; i < 50; i++) {
                  newData.push({
                      text : data['topic'][i],
                      value : data['likes'][i]
                  })
              }
              return newData;
          }))
    }, []);

    return (
        <div style={{marginTop: 10, display:'flex', justifyContent: 'space-around'}}>
            <div>
                <h2>다양한 주제의 강연들이 있습니다.</h2>
                <h4>다양한 주제 속에서 관심 있는 주제의 강연들을 찾아보세요</h4>
                <h4>다양한 주제로 이루어진 강연을 통해 교양 지식을 얻을 수 있습니다.</h4>
            </div>
            <div style={{ height: 600, width: 1000}}>
                <ReactWordcloud options={options} words={topicLike} />
            </div>
        </div>
    );
}

export default TopicChart;