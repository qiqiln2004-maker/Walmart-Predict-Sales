import React from 'react';
import { ForecastParams } from '../types';

interface SidebarProps {
  params: ForecastParams;
  setParams: React.Dispatch<React.SetStateAction<ForecastParams>>;
  onGenerate: () => void;
  isGenerating: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ params, setParams, onGenerate, isGenerating }) => {
  const handleChange = (field: keyof ForecastParams, value: any) => {
    setParams(prev => ({ ...prev, [field]: value }));
  };

  return (
    <aside className="w-80 flex-shrink-0 flex flex-col border-r border-gray-200 dark:border-border-dark bg-white dark:bg-[#112218] overflow-y-auto">
      <div className="p-5 flex flex-col gap-6 h-full">
        {/* Section Header */}
        <div>
          <h3 className="text-lg font-bold leading-tight tracking-[-0.015em] pb-2 text-gray-900 dark:text-white">Forecast Parameters</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Configure inputs to generate predictions.</p>
        </div>

        {/* Store Selection */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Store / Department</label>
          <div className="relative">
            <select 
              value={params.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full h-12 rounded-lg border border-gray-300 dark:border-border-dark bg-gray-50 dark:bg-surface-dark text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none cursor-pointer"
            >
              <option value="" disabled>Select a location</option>
              <option value="store-101">Store #101 - Bentonville</option>
              <option value="store-102">Store #102 - Fayetteville</option>
              <option value="store-103">Store #103 - Rogers</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <span className="material-symbols-outlined">expand_more</span>
            </div>
          </div>
        </div>

        {/* Time Horizon */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Forecast Horizon</label>
          <div className="flex gap-2">
            {['4 Weeks', '12 Weeks', 'YTD'].map((opt) => (
              <button
                key={opt}
                onClick={() => handleChange('horizon', opt)}
                className={`flex-1 h-10 rounded-lg text-sm font-medium flex items-center justify-center transition-colors ${
                  params.horizon === opt
                    ? 'bg-primary/20 border border-primary text-primary'
                    : 'border border-gray-300 dark:border-border-dark bg-gray-50 dark:bg-surface-dark text-gray-500 dark:text-gray-400 hover:border-primary/50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          <div className="relative mt-2">
            <input 
              type="text" 
              placeholder="Custom Date Range"
              value={params.customDate}
              onChange={(e) => handleChange('customDate', e.target.value)}
              className="w-full h-12 rounded-lg border border-gray-300 dark:border-border-dark bg-gray-50 dark:bg-surface-dark text-gray-900 dark:text-white px-4 py-2 pl-11 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <span className="material-symbols-outlined text-[20px]">calendar_today</span>
            </div>
          </div>
        </div>

        {/* Scenario Planning Section */}
        <div className="pt-4 border-t border-gray-200 dark:border-border-dark">
          <h3 className="text-base font-bold leading-tight pb-4 flex items-center gap-2 text-gray-900 dark:text-white">
            <span className="material-symbols-outlined text-primary">tune</span>
            Scenario Planning
          </h3>
          <div className="flex flex-col gap-6">
            
            {/* Slider 1: Temperature */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">Avg. Temperature</span>
                <span className="font-mono text-primary font-bold">{params.temperature > 0 ? '+' : ''}{params.temperature}°F</span>
              </div>
              <input 
                type="range" 
                min="-10" 
                max="10" 
                value={params.temperature}
                onChange={(e) => handleChange('temperature', parseInt(e.target.value))}
                className="w-full h-1 bg-gray-200 dark:bg-border-dark rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>-10°</span>
                <span>0</span>
                <span>+10°</span>
              </div>
            </div>

            {/* Slider 2: Fuel Price */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">Fuel Price Impact</span>
                <span className="font-mono text-primary font-bold">{params.fuelPrice > 0 ? '+' : ''}{params.fuelPrice}%</span>
              </div>
              <input 
                type="range" 
                min="-5" 
                max="5" 
                value={params.fuelPrice}
                onChange={(e) => handleChange('fuelPrice', parseInt(e.target.value))}
                className="w-full h-1 bg-gray-200 dark:bg-border-dark rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>-5%</span>
                <span>0</span>
                <span>+5%</span>
              </div>
            </div>

            {/* Slider 3: CPI */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">CPI Adjustment</span>
                <span className="font-mono text-primary font-bold">{params.cpi > 0 ? '+' : ''}{params.cpi}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="5" 
                step="0.1"
                value={params.cpi}
                onChange={(e) => handleChange('cpi', parseFloat(e.target.value))}
                className="w-full h-1 bg-gray-200 dark:bg-border-dark rounded-lg appearance-none cursor-pointer"
              />
            </div>

          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto pt-6 flex flex-col gap-3">
          <button 
            onClick={onGenerate}
            disabled={isGenerating}
            className="w-full h-12 rounded-lg bg-primary text-[#102217] text-base font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
               <span className="material-symbols-outlined animate-spin">refresh</span>
            ) : (
                <span className="material-symbols-outlined">auto_graph</span>
            )}
            {isGenerating ? "Forecasting..." : "Generate Forecast"}
          </button>
          <button className="w-full h-12 rounded-lg border border-gray-300 dark:border-border-dark bg-transparent text-gray-700 dark:text-white text-sm font-medium hover:bg-white/5 transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">download</span>
            Export Report
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;