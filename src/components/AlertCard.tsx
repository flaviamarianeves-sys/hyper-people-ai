import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Info, ArrowRight } from "lucide-react";
import { Alert } from "@/types";
import { cn } from "@/lib/utils";

interface AlertCardProps {
  alert: Alert;
  onAction?: (alertId: string) => void;
}

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircle,
  info: Info,
};

const variantMap = {
  warning: "destructive",
  success: "default", 
  info: "secondary",
} as const;

const backgroundMap = {
  warning: "card-warning",
  success: "card-success",
  info: "card-primary",
};

export const AlertCard = ({ alert, onAction }: AlertCardProps) => {
  const IconComponent = iconMap[alert.type];
  
  return (
    <Card className={cn(
      "hover-lift transition-all duration-200 border-l-4",
      backgroundMap[alert.type],
      alert.type === "warning" && "border-l-warning",
      alert.type === "success" && "border-l-success",
      alert.type === "info" && "border-l-primary"
    )}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className={cn(
              "p-2 rounded-lg",
              alert.type === "warning" && "bg-warning/10",
              alert.type === "success" && "bg-success/10",
              alert.type === "info" && "bg-primary/10"
            )}>
              <IconComponent className={cn(
                "h-4 w-4",
                alert.type === "warning" && "text-warning",
                alert.type === "success" && "text-success",
                alert.type === "info" && "text-primary"
              )} />
            </div>
            
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm">{alert.title}</h3>
                <Badge variant={variantMap[alert.type]} className="text-xs">
                  {alert.type === "warning" && "Atenção"}
                  {alert.type === "success" && "Sucesso"}
                  {alert.type === "info" && "Oportunidade"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{alert.description}</p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-2 h-8 text-xs p-0 hover:bg-transparent"
                onClick={() => onAction?.(alert.id)}
              >
                {alert.action}
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};