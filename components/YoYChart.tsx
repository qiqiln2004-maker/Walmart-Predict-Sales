import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Cell,
  Tooltip
} from 'recharts';
import { YoYData } from '../types';

interface YoYChartProps {
  data: YoYData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface-dark border border-border-dark p-2 rounded shadow-lg text-xs">
          <div className="text-gray-300 font-bold mb-1">{label}</div>
          {payload.map((entry: any, index: number) => (
              <div key={index} style={{ color: entry.color }}>
                  {entry.name === 'current' ? 'This Year' : 'Last Year'}: {entry.value}k
              </div>
          ))}
        </div>
      );
    }
    return null;
  };

const YoYChart: React.FC<YoYChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        barGap={4}
      >
        <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            dy={5}
        />
        <Tooltip content={<CustomTooltip />} cursor={{fill: '#ffffff10'}} />
        
        {/* Last Year Bar - Gray */}
        <Bar dataKey="lastYear" fill="#4b5563" opacity={0.5} radius={[2, 2, 0, 0]} />
        
        {/* Current Year Bar - Dynamic Fill based on forecast status */}
        <Bar dataKey="current" radius={[2, 2, 0, 0]}>
          {data.map((entry, index) => (
            <Cell 
                key={`cell-${index}`} 
                fill={entry.isForecast ? 'url(#forecastBarPattern)' : '#2bee79'} 
                stroke={entry.isForecast ? '#2bee79' : 'none'}
                strokeWidth={entry.isForecast ? 1 : 0}
                strokeDasharray={entry.isForecast ? "4 2" : ""}
                className="transition-all duration-300 hover:opacity-80"
            />
          ))}
        </Bar>

        <defs>
            <pattern id="forecastBarPattern" patternUnits="userSpaceOnUse" width="4" height="4">
                <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" stroke="#2bee79" strokeWidth="1" opacity="0.5" />
            </pattern>
        </defs>

      </BarChart>
    </ResponsiveContainer>
  );
};

export default YoYChart;