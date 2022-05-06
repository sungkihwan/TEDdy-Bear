import React, {useEffect, useState} from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import * as Api from '../../api';
import RenderCustomizedLabel from './View/RenderCustomizedLabel';
import CustomTooltip from './View/CustomTooltip';

function TopicLikeChart() {
    const [topciLecture, setTopicLecture] = useState([]);

    useEffect(() => {
        Api.get('data', 'top20topicCount')
            .then(res => setTopicLecture(() => {
                const newData = [];
                for (let i = 0; i < 20; i++) {
                    newData.push({
                        name : res.data.data['topic'][i],
                        value : res.data.data['talkcount'][i]
                    })
                }
                return newData;
            }))
    }, [])
    
    const COLORS = ['#f44336', '#9c27b0', '#2196f3', '#009688', '#cddc39', '#ffeb3b', '#ff9800', '#795548', '#607d8b', '#00bcd4', '#9e9e9e'];
    
    
    return (
        <div style={{marginTop: 10, display:'flex', justifyContent: 'space-around'}}>
            <div>
            <PieChart width={800} height={800}>
                <Pie data={topciLecture} color="#000000" dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={300} fill="#8884d8" label={RenderCustomizedLabel}>
                    {
                        topciLecture.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
            </PieChart>
            </div>
            <div>
                <h2>주제마다 여러개의 강연들이 존재합니다.</h2>
            </div>
        </div>
    );
}

export default TopicLikeChart;