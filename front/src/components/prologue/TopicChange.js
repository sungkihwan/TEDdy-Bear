import {LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line} from "recharts"

function TopicChange() {
    let data = [
        {
            "name": "2006년",
            "science": 0,
            "culture": 0,
            "technology": 0,
            "animation": 0,
            "business":0,
        },
        {
            "name": "2007년",
            "science": 0,
            "culture": 0,
            "technology": 0,
            "animation": 0,
            "business":0,
        },
        {
            "name": "2008년",
            "science": 0,
            "culture": 0,
            "technology": 0,
            "animation": 0,
            "business":0,
        },
        {
            "name": "2009년",
            "science": 0,
            "culture": 0,
            "technology": 0,
            "animation": 0,
            "business":0,
        },
        {
            "name": "2010년",
            "science": 0,
            "culture": 0,
            "technology": 0,
            "animation": 0,
            "business":0,
        },
        {
            "name": "2011년",
            "science": 0,
            "culture": 0,
            "technology": 0,
            "animation": 0,
            "business":0,
        },
        {
            "name": "2012년",
            "science": 0,
            "culture": 0,
            "technology": 0,
            "animation": 0,
            "business":0,
        },
        {
            "name": "2013년",
            "science": 0,
            "culture": 0,
            "technology": 0,
            "animation": 0,
            "business":0,
        },
        {
            "name": "2014년",
            "science": 0,
            "culture": 0,
            "technology": 0,
            "animation": 0,
            "business":0,
        },
        {
            "name": "2015년",
            "science": 0,
            "culture": 0,
            "technology": 0,
            "animation": 0,
            "business":0,
        },
        {
            "name": "2016년",
            "science": 0,
            "culture": 0,
            "technology": 0,
            "animation": 0,
            "business":0,
        },
        {
            "name": "2017년",
            "science": 0,
            "culture": 0,
            "technology": 0,
            "animation": 0,
            "business":0,
        },
        {
            "name": "2018년",
            "science": 0,
            "culture": 0,
            "technology": 0,
            "animation": 0,
            "business":0,
        },
        {
            "name": "2019년",
            "science": 0,
            "culture": 0,
            "technology": 0,
            "animation": 0,
            "business":0,
        },
    ];

    for (let i = 0; i < data.length; i++) {
        data[i]['science'] = Math.floor(Math.random() * 10000) + 1;
        data[i]['culture'] = Math.floor(Math.random() * 10000) + 1;
        data[i]['technology'] = Math.floor(Math.random() * 10000) + 1;
        data[i]['animation'] = Math.floor(Math.random() * 10000) + 1;
        data[i]['business'] = Math.floor(Math.random() * 10000) + 1;
    }

    return (
      <div
        style={{
          marginTop: 10,
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div style={{ border: "2px solid black" }}>
          <LineChart
            width={730}
            height={250}
            data={data}
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
        <div>
            <h2>현재 Top 5 주제의 변화율</h2>
        </div>
      </div>
    );
}

export default TopicChange;