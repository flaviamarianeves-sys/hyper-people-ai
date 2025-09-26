import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { ChartData } from "@/types";

interface EngagementChartProps {
  data: ChartData[];
}

const chartConfig = {
  engagement: {
    label: "Engajamento",
    color: "hsl(224, 76%, 48%)",
  },
  satisfaction: {
    label: "Satisfação",
    color: "hsl(262, 83%, 58%)",
  },
};

export const EngagementChart = ({ data }: EngagementChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tendência de Engajamento</CardTitle>
        <CardDescription>
          Evolução do engajamento e satisfação nos últimos 6 meses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="engagement"
                stroke="hsl(224, 76%, 48%)"
                strokeWidth={3}
                dot={{ fill: "hsl(224, 76%, 48%)", r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="satisfaction"
                stroke="hsl(262, 83%, 58%)"
                strokeWidth={3}
                dot={{ fill: "hsl(262, 83%, 58%)", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};