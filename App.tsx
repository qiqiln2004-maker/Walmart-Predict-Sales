import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import { ForecastParams, KPIData, WeeklyData, YoYData } from './types';
import { generateForecastInsight } from './services/geminiService';

// Mock Data Generators
const generateWeeklyData = (temp: number, fuel: number, cpi: number): WeeklyData[] => {
  const base = 1.0;
  const modifier = 1 + (temp * 0.01) - (fuel * 0.02) - (cpi * 0.01); // Simple logic
  
  const data: WeeklyData[] = [];
  
  // Historical (Weeks 1-8)
  for (let i = 1; i <= 8; i++) {
    data.push({
      week: `Wk ${i}`,
      historical: Number((base + Math.random() * 0.5).toFixed(2)),
      forecast: null
    });
  }
  
  // Transition point
  const lastHistorical = data[data.length - 1].historical || 1.2;
  data[data.length - 1].forecast = lastHistorical; 

  // Forecast (Weeks 9-16)
  let currentVal = lastHistorical;
  for (let i = 9; i <= 16; i++) {
    const change = (Math.random() - 0.4) * modifier;
    currentVal = Math.max(0.5, currentVal + change);
    
    // Smooth trend upwards for visual effect if modifier is positive
    if (modifier > 1) currentVal += 0.05;

    data.push({
      week: `Wk ${i}`,
      historical: null,
      forecast: Number(currentVal.toFixed(2))
    });
  }

  return data;
};

const generateYoYData = (modifier: number): YoYData[] => {
    const months = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map((m, i) => {
        const lastYear = Math.floor(Math.random() * 50) + 100;
        // December is forecast
        const isForecast = m === 'Dec';
        const current = isForecast 
            ? Math.floor(lastYear * modifier * 1.1) 
            : Math.floor(lastYear * (1 + (Math.random() * 0.1)));
        
        return {
            month: m,
            lastYear,
            current,
            isForecast
        };
    });
}

const App: React.FC = () => {
  // State for Params
  const [params, setParams] = useState<ForecastParams>({
    location: '',
    horizon: '4 Weeks',
    customDate: '',
    temperature: 2,
    fuelPrice: 0,
    cpi: 1.2,
  });

  // State for Data
  const [kpiData, setKpiData] = useState<KPIData[]>([
    {
      label: 'Total Forecasted Sales',
      value: '$1.42M',
      trend: 16.2,
      trendLabel: 'vs last period',
      icon: 'attach_money',
      iconColor: 'text-primary bg-primary',
      trendColor: 'text-primary bg-primary'
    },
    {
      label: 'Model Confidence',
      value: '94.8%',
      trend: 98, // High score
      trendLabel: 'Accuracy Score',
      icon: 'verified_user',
      iconColor: 'text-blue-500 bg-blue-500',
      trendColor: 'text-blue-400 bg-blue-400'
    },
    {
      label: 'Predicted Foot Traffic',
      value: '28.5k',
      trend: 5.4,
      trendLabel: 'YoY Growth',
      icon: 'directions_walk',
      iconColor: 'text-purple-500 bg-purple-500',
      trendColor: 'text-primary bg-primary'
    }
  ]);

  const [salesData, setSalesData] = useState<WeeklyData[]>([]);
  const [yoyData, setYoYData] = useState<YoYData[]>([]);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Initialize data
  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate API delay and calculation
    setTimeout(async () => {
        const modifier = 1 + (params.temperature * 0.02) - (params.fuelPrice * 0.03);
        
        const newSalesData = generateWeeklyData(params.temperature, params.fuelPrice, params.cpi);
        setSalesData(newSalesData);
        setYoYData(generateYoYData(modifier));
        
        // Update KPIs loosely based on params
        const newTotal = (1.42 * modifier).toFixed(2);
        setKpiData(prev => [
            { ...prev[0], value: `$${newTotal}M`, trend: Number((16.2 * modifier).toFixed(1)) },
            prev[1],
            { ...prev[2], value: `${(28.5 * modifier).toFixed(1)}k` }
        ]);

        // Call Gemini
        if (process.env.API_KEY) {
            const insight = await generateForecastInsight(params);
            setAiInsight(insight);
        } else {
             setAiInsight("Forecast generated based on simulation parameters. (Connect Gemini API Key for detailed insights)");
        }

        setIsGenerating(false);
    }, 800);
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
            params={params} 
            setParams={setParams} 
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
        />
        <Dashboard 
            kpiData={kpiData}
            salesData={salesData}
            yoyData={yoyData}
            aiInsight={aiInsight}
        />
      </div>
    </div>
  );
};

export default App;