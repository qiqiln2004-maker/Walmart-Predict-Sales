import React from 'react';
import { KPIData } from '../types';

const KPICard: React.FC<{ data: KPIData }> = ({ data }) => {
  return (
    <div className="bg-white dark:bg-surface-dark rounded-xl p-5 border border-gray-100 dark:border-border-dark shadow-sm hover:border-primary/30 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{data.label}</span>
          <h4 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{data.value}</h4>
        </div>
        <div className={`p-2 rounded-lg ${data.iconColor} bg-opacity-10`}>
          <span className="material-symbols-outlined">{data.icon}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={`flex items-center text-xs font-bold ${data.trendColor} bg-opacity-10 px-2 py-0.5 rounded-full`}>
          <span className="material-symbols-outlined text-[14px] mr-0.5">
            {data.trend >= 0 ? 'trending_up' : 'trending_down'}
          </span>
          {data.trend >= 0 ? '+' : ''}{data.trend}%
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">{data.trendLabel}</span>
      </div>
    </div>
  );
};

export default KPICard;