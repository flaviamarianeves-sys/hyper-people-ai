// Tipos para a aplicação Mosaic-AI

export interface KPI {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
  type: 'primary' | 'success' | 'warning' | 'accent';
}

export interface ChartData {
  month: string;
  engagement: number;
  satisfaction: number;
}

export interface DepartmentData {
  name: string;
  value: number;
  color: string;
}

export interface Alert {
  id: string;
  type: 'warning' | 'success' | 'info';
  title: string;
  description: string;
  action: string;
}

export interface NetworkMetric {
  id: string;
  title: string;
  value: string;
  icon: string;
}

export interface KeyCollaborator {
  id: string;
  name: string;
  role: string;
  influence: number;
  connections: number;
}

export interface NetworkInsight {
  id: string;
  text: string;
}