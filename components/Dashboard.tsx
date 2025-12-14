import React from 'react';
import KPICard from './KPICard';
import SalesChart from './SalesChart';
import YoYChart from './YoYChart';
import { KPIData, WeeklyData, YoYData } from '../types';

interface DashboardProps {
  kpiData: KPIData[];
  salesData: WeeklyData[];
  yoyData: YoYData[];
  aiInsight: string | null;
}

const Dashboard: React.FC<DashboardProps> = ({ kpiData, salesData, yoyData, aiInsight }) => {
  return (
    <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-background-dark p-6 lg:p-10 scroll-smooth">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
        
        {/* KPI Scorecards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kpiData.map((kpi, index) => (
            <KPICard key={index} data={kpi} />
          ))}
        </div>

        {/* AI Insight (Conditional) */}
        {aiInsight && (
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex gap-4 items-start">
                 <div className="p-2 bg-primary/20 rounded-lg text-primary shrink-0">
                    <span className="material-symbols-outlined">auto_awesome</span>
                </div>
                <div>
                    <h4 className="text-sm font-bold text-white mb-1">AI Forecast Analysis</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">{aiInsight}</p>
                </div>
            </div>
        )}

        {/* Main Chart Section */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Weekly Sales Forecast</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Historical performance vs. AI predicted trends.</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-gray-500"></span>
                <span className="text-gray-500 dark:text-gray-400">Historical</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
                <span className="text-gray-900 dark:text-white font-medium">Forecast</span>
              </div>
            </div>
          </div>
          <div className="w-full bg-white dark:bg-surface-dark border border-gray-100 dark:border-border-dark rounded-xl p-6 h-[400px]">
            <SalesChart data={salesData} />
          </div>
        </div>

        {/* Secondary Chart: YoY Comparison */}
        <div className="flex flex-col gap-4 pb-10">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">YoY Performance Analysis</h3>
            </div>
          </div>
          <div className="w-full bg-white dark:bg-surface-dark border border-gray-100 dark:border-border-dark rounded-xl p-6 h-[300px]">
            <YoYChart data={yoyData} />
          </div>
        </div>

      </div>
    </main>
  );
};

export default Dashboard;