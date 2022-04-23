import {ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Scatter} from "recharts"


function StudentScore() {
    let data = []
    let x = 0;
    let y = 0;
    for (let i = 0; i < 20; i++) {
        x = Math.floor(Math.random() * 100) + 1;
        y = Math.floor(Math.random() * 100) + 1;
        data.push({'x':x, 'y':y});
    }

    return (
      <div
        style={{
          marginTop: 10,
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div>
            <h2>꾸준한 학습을 통해 발전할 수 있다!</h2>
        </div>
        <div style={{ border: "2px solid red" }}>
          <ScatterChart
            width={730}
            height={250}
            margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" name="시간" unit="시간" />
            <YAxis dataKey="y" name="점" unit="점" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Legend />
            <Scatter name="학생 공부시간에 대한 점수 향상" data={data} fill="#8884d8" />
          </ScatterChart>
        </div>
      </div>
    );
}

export default StudentScore;