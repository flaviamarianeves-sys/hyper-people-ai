import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "./Header";
import { Dashboard } from "./Dashboard";
import { NetworkAnalysis } from "./NetworkAnalysis";
import { useToast } from "@/hooks/use-toast";

export const MosaicAI = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();

  const handleRefresh = () => {
    toast({
      title: "Dados atualizados",
      description: "Os dados foram sincronizados com sucesso.",
    });
  };

  const handleExport = () => {
    toast({
      title: "Exportação iniciada",
      description: "Seu relatório será enviado por email em alguns minutos.",
    });
  };

  const handleFilter = () => {
    toast({
      title: "Filtros",
      description: "Painel de filtros avançados será aberto em breve.",
    });
  };

  const handleAlertAction = (alertId: string) => {
    toast({
      title: "Ação executada",
      description: "A ação para este alerta foi processada com sucesso.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onRefresh={handleRefresh}
        onExport={handleExport}
        onFilter={handleFilter}
      />
      
      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="dashboard" className="text-sm">
              Dashboard Principal
            </TabsTrigger>
            <TabsTrigger value="network" className="text-sm">
              Análise de Rede
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <Dashboard onAlertAction={handleAlertAction} />
          </TabsContent>

          <TabsContent value="network" className="space-y-6">
            <NetworkAnalysis />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};