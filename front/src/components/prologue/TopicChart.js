import React, { useEffect, useState } from "react";
import ReactWordcloud from "react-wordcloud";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import * as Api from "../../api";

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
  transitionDuration: 1000,
};

function TopicChart() {
  const [topicLike, setTopicLike] = useState([]);
  useEffect(() => {
    Api.get("data", "topicLikes").then((res) =>
      setTopicLike(() => {
        const newData = [];
        const { data } = res.data;
        for (let i = 0; i < 50; i++) {
          newData.push({
            text: data["topic"][i],
            value: data["likes"][i],
          });
        }
        return newData;
      })
    );
  }, []);

  return (
    <div
      style={{ marginTop: 10, display: "flex", justifyContent: "space-around" }}
    >
      <div style={{ height: 600, width: 700 }}>
        <ReactWordcloud options={options} words={topicLike} />
      </div>
      <div>
        <h1>주제에는 어떤 것들이 있을까요</h1>
        <h3>관심 있는 주제가 있나요?</h3>
        <h3>원하는 주제를 찾아보세요!</h3>
      </div>
    </div>
  );
}

export default TopicChart;
