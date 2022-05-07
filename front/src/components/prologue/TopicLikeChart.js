import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import * as Api from "../../api";
import RenderCustomizedLabel from "./View/RenderCustomizedLabel";
import CustomTooltip from "./View/CustomTooltip";

function TopicLikeChart() {
  const [topciLecture, setTopicLecture] = useState([]);

  useEffect(() => {
    Api.get("data", "top20topicCount").then((res) =>
      setTopicLecture(() => {
        const newData = [];
        for (let i = 0; i < 20; i++) {
          newData.push({
            name: res.data.data["topic"][i],
            value: res.data.data["talkcount"][i],
          });
        }
        return newData;
      })
    );
  }, []);

  const COLORS = [
    "#f44336",
    "#9c27b0",
    "#2196f3",
    "#009688",
    "#cddc39",
    "#ffeb3b",
    "#ff9800",
    "#795548",
    "#607d8b",
    "#00bcd4",
    "#9e9e9e",
  ];

  return (
    <div
      style={{ marginTop: 10, display: "flex", justifyContent: "space-around" }}
    >
      <div>
        <h1>주제별 비율</h1>
        <h3>어떤 주제의 강연이 가장 인기가 많을까요?</h3>
        <h3>인기있는 주제의 강연을 시청해보세요!</h3>
      </div>
      <div>
        <PieChart width={600} height={700}>
          <Pie
            data={topciLecture}
            color="#000000"
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={300}
            fill="#8884d8"
            label={RenderCustomizedLabel}
          >
            {topciLecture.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
}

export default TopicLikeChart;
