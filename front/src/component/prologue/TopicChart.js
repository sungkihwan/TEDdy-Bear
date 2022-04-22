import React from "react";
import ReactWordcloud from "react-wordcloud";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

const words = [
    {
        text:'science',
        value:0
    },
    {
        text:'culture',
        value:0
    },
    {
        text:'technology',
        value:0
    },
    {
        text:'animation',
        value:0
    },
    {
        text:'business',
        value:0
    },
    {
        text:'health',
        value:0
    },
    {
        text:'society',
        value:0
    },
    {
        text:'brain',
        value:0
    },
    {
        text:'social change',
        value:0
    },
    {
        text:'psychology',
        value:0
    },
    {
        text:'global issues',
        value:0
    },
    {
        text:'humanity',
        value:0
    },
    {
        text:'education',
        value:0
    },
    {
        text:'entertainment',
        value:0
    },
    {
        text:'design',
        value:0
    },
    {
        text:'history',
        value:0
    },
    {
        text:'biology',
        value:0
    },
    {
        text:'communication',
        value:0
    },
    {
        text:'collaboration',
        value:0
    },
    {
        text:'children',
        value:0
    },
    {
        text:'science',
        value:0
    },
    {
        text:'culture',
        value:0
    },
    {
        text:'technology',
        value:0
    },
    {
        text:'animation',
        value:0
    },
    {
        text:'business',
        value:0
    },
    {
        text:'health',
        value:0
    },
    {
        text:'society',
        value:0
    },
    {
        text:'brain',
        value:0
    },
    {
        text:'social change',
        value:0
    },
    {
        text:'psychology',
        value:0
    },
    {
        text:'global issues',
        value:0
    },
    {
        text:'humanity',
        value:0
    },
    {
        text:'education',
        value:0
    },
    {
        text:'entertainment',
        value:0
    },
    {
        text:'design',
        value:0
    },
    {
        text:'history',
        value:0
    },
    {
        text:'biology',
        value:0
    },
    {
        text:'communication',
        value:0
    },
    {
        text:'collaboration',
        value:0
    },
    {
        text:'children',
        value:0
    },
]

const options = {
  colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
  enableTooltip: true,
  deterministic: false,
  fontFamily: "impact",
  fontSizes: [5, 60],
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

    for (let i = 0; i < words.length; i++) {
        words[i].value = Math.floor(Math.random() * 200) + 1;
    }

    return (
        <div style={{border: '2px solid orange', marginTop: 10, display:'flex', justifyContent: 'space-around'}}>
            <div>
                <h2>다양한 주제의 강연들이 있습니다.</h2>
                <h4>다양한 주제 속에서 관심 있는 주제의 강연들을 찾아보세요</h4>
                <h4>다양한 주제로 이루어진 강연을 통해 교양 지식을 얻을 수 있습니다.</h4>
            </div>
            <div style={{ height: 600, width: 1000, border: '2px solid purple'}}>
                <ReactWordcloud options={options} words={words} />
            </div>
        </div>
    );
}

export default TopicChart;