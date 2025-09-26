import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, Users, Heart, Clock } from "lucide-react";
import { KPI } from "@/types";
import { cn } from "@/lib/utils";

interface KPICardProps {
  kpi: KPI;
}

const iconMap = {
  Users: Users,
  Heart: Heart,
  TrendingUp: TrendingUp,
  Clock: Clock,
};

export const KPICard = ({ kpi }: KPICardProps) => {
  const IconComponent = iconMap[kpi.icon as keyof typeof iconMap] || Users;
  const isPositive = kpi.trend === 'up';
  const isNegative = kpi.trend === 'down';
  
  const TrendIcon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;

  return (
    <Card className={cn(
      "hover-lift transition-all duration-200 border-2",
      kpi.type === "primary" && "card-primary",
      kpi.type === "success" && "card-success", 
      kpi.type === "warning" && "card-warning",
      kpi.type === "accent" && "card-accent"
    )}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className={cn(
              "p-2 rounded-lg w-fit",
              kpi.type === "primary" && "bg-primary/10",
              kpi.type === "success" && "bg-success/10",
              kpi.type === "warning" && "bg-warning/10",
              kpi.type === "accent" && "bg-accent/10"
            )}>
              <IconComponent className={cn(
                "h-5 w-5",
                kpi.type === "primary" && "text-primary",
                kpi.type === "success" && "text-success",
                kpi.type === "warning" && "text-warning",
                kpi.type === "accent" && "text-accent"
              )} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </h3>
              <p className="text-2xl font-bold mt-1">{kpi.value}</p>
            </div>
          </div>
          
          <Badge 
            variant={isPositive ? "default" : isNegative ? "destructive" : "secondary"}
            className="flex items-center gap-1"
          >
            <TrendIcon className="h-3 w-3" />
            {kpi.change}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};