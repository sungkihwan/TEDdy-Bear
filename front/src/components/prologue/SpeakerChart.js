import React, { useEffect, useState } from "react";
import * as Api from "../../api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function SpeakerChart() {
  const [speakerData, setSpeakerData] = useState([]);

  useEffect(() => {
    Api.get("data", "occupationsLikes").then((res) =>
      setSpeakerData(() => {
        const newData = [];
        const { data } = res.data;
        for (let i = 0; i < data["name"].length; i++) {
          newData.push({
            name: `${data["name"][i]} (${data["topic"][i]})`,
            likes: data["likes"][i],
          });
        }
        return newData;
      })
    );
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: 630,
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <div
        style={{
          width: "60%",
          height: "100%",
        }}
      >
        <ResponsiveContainer width="100%" height="90%">
          <BarChart
            data={speakerData}
            width={700}
            height={700}
            layout="vertical"
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="0" horizontal={false} />
            <XAxis type="number" />
            <YAxis
              dataKey="name"
              type="category"
              height={30}
              width={260}
              style={{ whiteSpace: "pre-wrap" }}
            />
            <Tooltip cursor={false} />
            <Legend />
            <Bar
              dataKey="likes"
              stackId="a"
              fill="#DE4E60"
              maxBarSize={24}
              fontSize={10}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h2>연사들이 강연을 해요!</h2>
        <h4>다양한 직업을 가진 연사들이 TED에서 강연 활동을 하고 있어요</h4>
        <h4>많은 사람들이 열광하는 강연 같이 들으실래요?</h4>
      </div>
    </div>
  );
}

export default SpeakerChart;
