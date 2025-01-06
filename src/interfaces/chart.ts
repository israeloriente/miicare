export interface BarChartData {
  date: string;
  value: number;
}
export interface PieChartData {
  category: string;
  value: number;
}
export interface TaskTableData {
  date: string;
  title: string;
}
export type BarChartTabs = 'daily' | 'monthly' | 'custom';
