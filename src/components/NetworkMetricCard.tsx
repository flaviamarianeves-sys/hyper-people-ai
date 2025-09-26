import { Card, CardContent } from "@/components/ui/card";
import { Network, Users, TrendingUp } from "lucide-react";
import { NetworkMetric } from "@/types";

interface NetworkMetricCardProps {
  metric: NetworkMetric;
}

const iconMap = {
  Network: Network,
  Users: Users,
  TrendingUp: TrendingUp,
};

export const NetworkMetricCard = ({ metric }: NetworkMetricCardProps) => {
  const IconComponent = iconMap[metric.icon as keyof typeof iconMap] || Network;
  
  return (
    <Card className="hover-lift border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
      <CardContent className="p-6 text-center">
        <div className="space-y-4">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <IconComponent className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">{metric.value}</p>
            <h3 className="text-sm font-medium text-muted-foreground mt-1">
              {metric.title}
            </h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};