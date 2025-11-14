import { NetworkMetricCard } from "./NetworkMetricCard";
import { KeyCollaboratorCard } from "./KeyCollaboratorCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Network, AlertCircle } from "lucide-react";
import { 
  networkMetricsData, 
  keyCollaboratorsData, 
  networkInsightsData,
  organizationalNetworkData,
} from "@/lib/data";
import { OrganizationalNetworkGraph } from "./OrganizationalNetworkGraph";

export const NetworkAnalysis = () => {
  return (
    <div className="space-y-6">
      {/* Network Metrics */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Métricas da Rede</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {networkMetricsData.map((metric) => (
            <NetworkMetricCard key={metric.id} metric={metric} />
          ))}
        </div>
      </div>

      {/* Network Visualization */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Visualização da Rede</h2>
        <Card className="flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5 text-primary" />
              Mapa Organizacional de Rede
            </CardTitle>
            <CardDescription>
              Visualização interativa das conexões organizacionais
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            <p className="text-sm text-muted-foreground">
              A proximidade entre os nós reflete a intensidade da comunicação semanal, enquanto as cores destacam os setores dos colaboradores.
            </p>
            <OrganizationalNetworkGraph data={organizationalNetworkData} />
          </CardContent>
        </Card>
      </div>

      {/* Network Insights */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Insights da Rede</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Key Collaborators */}
          <KeyCollaboratorCard collaborators={keyCollaboratorsData} />

          {/* Attention Points */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-warning" />
                Pontos de Atenção
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {networkInsightsData.map((insight) => (
                <div 
                  key={insight.id}
                  className="p-3 rounded-lg bg-warning/5 border border-warning/20 flex items-start gap-3"
                >
                  <AlertCircle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-foreground">{insight.text}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Network Statistics */}
      <Card className="bg-muted/20">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">156</p>
              <p className="text-sm text-muted-foreground">Total de Colaboradores</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-success">342</p>
              <p className="text-sm text-muted-foreground">Conexões Ativas</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">4.2</p>
              <p className="text-sm text-muted-foreground">Grau Médio de Conexão</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
