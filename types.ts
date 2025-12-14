export interface ForecastParams {
  location: string;
  horizon: '4 Weeks' | '12 Weeks' | 'YTD';
  customDate: string;
  temperature: number;
  fuelPrice: number;
  cpi: number;
}

export interface KPIData {
  label: string;
  value: string;
  trend: number; // percentage
  trendLabel: string;
  icon: string;
  iconColor: string; // Tailwind color class stub
  trendColor: string; // Tailwind color class stub
}

export interface WeeklyData {
  week: string;
  historical: number | null;
  forecast: number | null;
}

export interface YoYData {
  month: string;
  lastYear: number;
  current: number;
  isForecast: boolean;
}
