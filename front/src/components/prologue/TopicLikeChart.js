import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';


function TopicLikeChart() {
    const data = [
        { name: 'science', value: 375 },
        { name: 'culture', value: 302 },
        { name: 'technology', value: 298 },
        { name: 'animation', value: 275 },
        { name: 'business', value: 211 },
        { name: 'health', value: 190 },
        { name: 'society', value: 188 },
        { name: 'brain', value: 173 },
        { name: 'social change', value: 152 },
        { name: 'psychology', value: 80 },
        { name: 'others', value: 1238 },
    ];
    
    const COLORS = ['#f44336', '#9c27b0', '#2196f3', '#009688', '#cddc39', '#ffeb3b', '#ff9800', '#795548', '#607d8b', '#00bcd4', '#9e9e9e'];
    
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx, cy, midAngle, innerRadius, outerRadius, percent, index,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div className="custom-tooltip" style={{ backgroundColor: '#ffff', padding: '5px', border: '1px solid #cccc' }}>
                    <label>{`${payload[0].name} : ${payload[0].value}`}</label>
                </div>
            );
        }

        return null;
    };
    return (
        <div style={{marginTop: 10, display:'flex', justifyContent: 'space-around'}}>
            <div>
            <PieChart width={800} height={800}>
                <Pie data={data} color="#000000" dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={300} fill="#8884d8" label={renderCustomizedLabel}>
                    {
                        data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
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