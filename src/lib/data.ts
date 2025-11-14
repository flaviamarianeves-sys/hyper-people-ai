// Dados mock para a aplicação Mosaic-AI
import {
  KPI,
  ChartData,
  DepartmentData,
  Alert,
  NetworkMetric,
  KeyCollaborator,
  NetworkInsight,
  OrganizationalNetworkData,
} from "@/types";

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

export const organizationalNetworkData: OrganizationalNetworkData = {
  nodes: [
    {
      id: "maria",
      name: "Maria Silva",
      role: "CEO",
      department: "Diretoria",
      photoUrl: "https://i.pravatar.cc/256?img=48",
    },
    {
      id: "pedro",
      name: "Pedro Lima",
      role: "Líder de Tecnologia",
      department: "Tecnologia",
      photoUrl: "https://i.pravatar.cc/256?img=12",
    },
    {
      id: "aline",
      name: "Aline Souza",
      role: "Engenheira de Software",
      department: "Tecnologia",
      photoUrl: "https://i.pravatar.cc/256?img=56",
    },
    {
      id: "rafael",
      name: "Rafael Costa",
      role: "Analista Financeiro",
      department: "Financeiro",
      photoUrl: "https://i.pravatar.cc/256?img=33",
    },
    {
      id: "carolina",
      name: "Carolina Mendes",
      role: "Head de Vendas",
      department: "Vendas",
      photoUrl: "https://i.pravatar.cc/256?img=47",
    },
    {
      id: "bruno",
      name: "Bruno Almeida",
      role: "Executivo de Contas",
      department: "Vendas",
      photoUrl: "https://i.pravatar.cc/256?img=37",
    },
    {
      id: "ana",
      name: "Ana Costa",
      role: "Head de RH",
      department: "RH",
      photoUrl: "https://i.pravatar.cc/256?img=5",
    },
    {
      id: "julia",
      name: "Júlia Rocha",
      role: "Business Partner",
      department: "RH",
      photoUrl: "https://i.pravatar.cc/256?img=23",
    },
    {
      id: "carlos",
      name: "Carlos Pereira",
      role: "Head de Marketing",
      department: "Marketing",
      photoUrl: "https://i.pravatar.cc/256?img=52",
    },
    {
      id: "lucia",
      name: "Lúcia Ferreira",
      role: "Designer Sênior",
      department: "Marketing",
      photoUrl: "https://i.pravatar.cc/256?img=19",
    },
    {
      id: "gabriel",
      name: "Gabriel Nunes",
      role: "Consultor de Vendas",
      department: "Vendas",
      photoUrl: "https://i.pravatar.cc/256?img=61",
    },
    {
      id: "fernanda",
      name: "Fernanda Dias",
      role: "Assistente Comercial",
      department: "Vendas",
      photoUrl: "https://i.pravatar.cc/256?img=65",
    },
  ],
  links: [
    { id: "maria-pedro", source: "maria", target: "pedro", frequencyPerWeek: 18 },
    { id: "maria-ana", source: "maria", target: "ana", frequencyPerWeek: 14 },
    { id: "maria-carlos", source: "maria", target: "carlos", frequencyPerWeek: 12 },
    { id: "maria-rafael", source: "maria", target: "rafael", frequencyPerWeek: 7 },
    { id: "pedro-aline", source: "pedro", target: "aline", frequencyPerWeek: 21 },
    { id: "pedro-ana", source: "pedro", target: "ana", frequencyPerWeek: 9 },
    { id: "pedro-carolina", source: "pedro", target: "carolina", frequencyPerWeek: 8 },
    { id: "pedro-lucia", source: "pedro", target: "lucia", frequencyPerWeek: 11 },
    { id: "aline-lucia", source: "aline", target: "lucia", frequencyPerWeek: 10 },
    { id: "rafael-carolina", source: "rafael", target: "carolina", frequencyPerWeek: 8 },
    { id: "rafael-ana", source: "rafael", target: "ana", frequencyPerWeek: 6 },
    { id: "rafael-carlos", source: "rafael", target: "carlos", frequencyPerWeek: 5 },
    { id: "carolina-bruno", source: "carolina", target: "bruno", frequencyPerWeek: 24 },
    { id: "carolina-carlos", source: "carolina", target: "carlos", frequencyPerWeek: 10 },
    { id: "carolina-ana", source: "carolina", target: "ana", frequencyPerWeek: 6 },
    { id: "bruno-julia", source: "bruno", target: "julia", frequencyPerWeek: 4 },
    { id: "bruno-lucia", source: "bruno", target: "lucia", frequencyPerWeek: 5 },
    { id: "ana-julia", source: "ana", target: "julia", frequencyPerWeek: 17 },
    { id: "ana-carlos", source: "ana", target: "carlos", frequencyPerWeek: 7 },
    { id: "carlos-lucia", source: "carlos", target: "lucia", frequencyPerWeek: 23 },
    { id: "carolina-gabriel", source: "carolina", target: "gabriel", frequencyPerWeek: 2 },
    { id: "bruno-gabriel", source: "bruno", target: "gabriel", frequencyPerWeek: 1 },
    { id: "gabriel-fernanda", source: "gabriel", target: "fernanda", frequencyPerWeek: 1 },
  ],
};
