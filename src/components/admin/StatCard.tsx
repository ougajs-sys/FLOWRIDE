import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    label: string;
  };
  icon: LucideIcon;
  iconColor?: string;
}

export function StatCard({ title, value, change, icon: Icon, iconColor = "text-primary" }: StatCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            {change && (
              <p className={cn(
                "text-sm",
                change.value >= 0 ? "text-green-600" : "text-red-600"
              )}>
                {change.value >= 0 ? "+" : ""}{change.value}% {change.label}
              </p>
            )}
          </div>
          <div className={cn("p-3 rounded-xl bg-primary/10", iconColor)}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
