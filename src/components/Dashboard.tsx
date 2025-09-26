import { KPICard } from "./KPICard";
import { EngagementChart } from "./EngagementChart";
import { DepartmentChart } from "./DepartmentChart";
import { AlertCard } from "./AlertCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import { 
  kpisData, 
  engagementTrendData, 
  departmentDistributionData, 
  alertsData 
} from "@/lib/data";

interface DashboardProps {
  onAlertAction?: (alertId: string) => void;
}

export const Dashboard = ({ onAlertAction }: DashboardProps) => {
  return (
    <div className="space-y-6">
      {/* KPIs Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Indicadores Principais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpisData.map((kpi) => (
            <KPICard key={kpi.id} kpi={kpi} />
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Análise de Tendências</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EngagementChart data={engagementTrendData} />
          <DepartmentChart data={departmentDistributionData} />
        </div>
      </div>

      {/* Insights and Alerts */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <h2 className="text-2xl font-semibold">Insights e Alertas</h2>
          <Badge variant="secondary" className="ml-2">
            {alertsData.length} ativos
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {alertsData.map((alert) => (
            <AlertCard 
              key={alert.id} 
              alert={alert} 
              onAction={onAlertAction}
            />
          ))}
        </div>
      </div>

      {/* Footer with last update */}
      <Card className="bg-muted/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-success rounded-full animate-pulse" />
              <span className="text-sm text-muted-foreground">
                Última atualização: {new Date().toLocaleString('pt-BR')}
              </span>
            </div>
            <Badge variant="outline">Dados em tempo real</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};