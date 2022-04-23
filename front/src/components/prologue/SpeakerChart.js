import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const data = [
  {
    name: "Amy Cuddy \n (social psychologist)",
    likes: 1900000,
  },
  {
    name: "Tim Urban \n (blogger)",
    likes: 1800000,
  },
  {
    name: "Sam Berns \n (activist)",
    likes: 1300000,
  },
  {
    name: "Robert Waldinger \n (psychiatrist)",
    likes: 1200000,
  },
  {
    name: "Brené Brown \n (vulnerability researcher)",
    likes: 1102000,
  },
  {
    name: "Cameron Russell \n (model)",
    likes: 1100000,
  },
  {
    name: "Mary Roach \n (writer)",
    likes: 1100000,
  },
  {
    name: "Simon Sinek \n (leadership expert)",
    likes: 1095000,
  },
  {
    name: "Tom Thum \n (beatboxer)",
    likes: 1000000,
  },
  {
    name: "Pamela Meyer \n (lie detector)",
    likes: 953000,
  },
  
];

function SpeakerChart() {
    return (
      <div
        style={{
          width: "100%",
          height: 630,
          display: "flex",
          justifyContent: 'space-around'
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
              data={data}
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
          <h2>다양한 직업의 연사들이 강연을 합니다.</h2>
          <h4>
            다양한 직업을 가진 연사들이 TED에서 강연 활동을 하고 있습니다.
          </h4>
          <h4>연사의 강연은 많은 사람들이 좋아하고 있습니다.</h4>
        </div>
      </div>
    );
}

export default SpeakerChart;