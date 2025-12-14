import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceDot
} from 'recharts';
import { WeeklyData } from '../types';

interface SalesChartProps {
  data: WeeklyData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const isForecast = payload[0].dataKey === 'forecast';
    
    return (
      <div className="bg-surface-dark border border-border-dark p-3 rounded-lg shadow-xl text-xs z-50">
        <div className="text-gray-400 mb-1">{label}</div>
        <div className="text-white font-bold text-lg">${value}M</div>
        {isForecast && (
          <div className="text-primary font-medium flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            Forecasted
          </div>
        )}
        {!isForecast && (
            <div className="text-gray-400 font-medium">Historical</div>
        )}
      </div>
    );
  }
  return null;
};

const SalesChart: React.FC<SalesChartProps> = ({ data }) => {
  return (
    <div className="w-full h-full relative group">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2bee79" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#2bee79" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="historicalGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6b7280" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#6b7280" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#234832" />
          <XAxis 
            dataKey="week" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6b7280', fontSize: 10 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'monospace' }} 
            tickFormatter={(value) => `${value}M`}
            domain={[0, 2.5]}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#2bee79', strokeWidth: 1, strokeDasharray: '4 4' }} />
          
          {/* Historical Line */}
          <Area
            type="monotone"
            dataKey="historical"
            stroke="#6b7280"
            strokeWidth={3}
            fill="url(#historicalGradient)"
            connectNulls
          />

          {/* Forecast Line */}
          <Area
            type="monotone"
            dataKey="forecast"
            stroke="#2bee79"
            strokeWidth={3}
            fill="url(#forecastGradient)"
            connectNulls
            activeDot={{ r: 6, fill: '#102217', stroke: '#2bee79', strokeWidth: 2 }}
          />

          {/* Connection Dot visualization handled by data structure usually, but we can add a custom dot if needed.
              Recharts connectsNulls prop handles the line continuity if data is structured correctly. 
          */}

        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;