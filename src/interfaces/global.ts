export interface User {
  username: string;
  password: string;
}
export interface BarChartData {
  date: string;
  value: number;
}
export interface PieChartData {
  category: string;
  value: number;
}
export type BarChartTabs = 'daily' | 'monthly' | 'custom';
