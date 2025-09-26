// Dados mock para a aplicação Mosaic-AI
import { KPI, ChartData, DepartmentData, Alert, NetworkMetric, KeyCollaborator, NetworkInsight } from "@/types";

export const kpisData: KPI[] = [
  {
    id: "1",
    title: "Taxa de Rotatividade",
    value: "12.3%",
    change: "-2.1%",
    trend: "down",
    icon: "Users",
    type: "success"
  },
  {
    id: "2",
    title: "Satisfação dos Colaboradores",
    value: "8.7/10",
    change: "+0.3",
    trend: "up",
    icon: "Heart",
    type: "primary"
  },
  {
    id: "3",
    title: "Índice de Diversidade",
    value: "73%",
    change: "+5%",
    trend: "up",
    icon: "TrendingUp",
    type: "accent"
  },
  {
    id: "4",
    title: "Tempo Médio no Cargo",
    value: "2.8 anos",
    change: "+0.2",
    trend: "up",
    icon: "Clock",
    type: "warning"
  }
];

export const engagementTrendData: ChartData[] = [
  { month: 'Jan', engagement: 75, satisfaction: 78 },
  { month: 'Fev', engagement: 78, satisfaction: 80 },
  { month: 'Mar', engagement: 82, satisfaction: 83 },
  { month: 'Abr', engagement: 85, satisfaction: 87 },
  { month: 'Mai', engagement: 87, satisfaction: 89 },
  { month: 'Jun', engagement: 89, satisfaction: 91 }
];

export const departmentDistributionData: DepartmentData[] = [
  { name: 'Tecnologia', value: 35, color: 'hsl(224, 76%, 48%)' },
  { name: 'Vendas', value: 25, color: 'hsl(188, 86%, 53%)' },
  { name: 'Marketing', value: 20, color: 'hsl(262, 83%, 58%)' },
  { name: 'RH', value: 12, color: 'hsl(160, 84%, 39%)' },
  { name: 'Financeiro', value: 8, color: 'hsl(32, 95%, 44%)' }
];

export const alertsData: Alert[] = [
  {
    id: "1",
    type: "warning",
    title: "Risco de Turnover Detectado",
    description: "3 colaboradores do time de desenvolvimento apresentam sinais de baixo engajamento",
    action: "Agendar 1:1 com gestores"
  },
  {
    id: "2",
    type: "success",
    title: "Melhoria no Engajamento",
    description: "Time de Marketing apresentou aumento de 15% na satisfação este mês",
    action: "Documentar boas práticas"
  },
  {
    id: "3",
    type: "info",
    title: "Oportunidade de Desenvolvimento",
    description: "12 colaboradores elegíveis para programa de mentoria",
    action: "Iniciar processo de matching"
  }
];

export const networkMetricsData: NetworkMetric[] = [
  {
    id: "1",
    title: "Densidade da Rede",
    value: "67%",
    icon: "Network"
  },
  {
    id: "2",
    title: "Influenciadores",
    value: "12",
    icon: "Users"
  },
  {
    id: "3",
    title: "Colaboração",
    value: "89%",
    icon: "TrendingUp"
  }
];

export const keyCollaboratorsData: KeyCollaborator[] = [
  {
    id: "1",
    name: "Maria Silva",
    role: "CEO",
    influence: 95,
    connections: 28
  },
  {
    id: "2",
    name: "Pedro Lima",
    role: "Dev Lead",
    influence: 87,
    connections: 15
  },
  {
    id: "3",
    name: "Ana Costa",
    role: "Head RH",
    influence: 82,
    connections: 22
  },
  {
    id: "4",
    name: "Lucia Ferreira",
    role: "Designer",
    influence: 78,
    connections: 12
  }
];

export const networkInsightsData: NetworkInsight[] = [
  {
    id: "1",
    text: "Isolamento detectado no time de vendas"
  },
  {
    id: "2",
    text: "Sobrecarga de comunicação na liderança"
  },
  {
    id: "3",
    text: "Oportunidade de mentoria cruzada"
  }
];