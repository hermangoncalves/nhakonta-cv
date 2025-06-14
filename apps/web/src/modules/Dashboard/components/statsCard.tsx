import { Card, CardContent } from "@/components/ui/card";

type StatsCardProps = {
  heading: string;
  count: number;
  icon: React.ReactNode;
};

export function StatsCard({ heading, count, icon }: StatsCardProps) {
  return (
    <Card className="border-none shadow-lg backdrop-blur-sm">
      <CardContent className="p-2 px-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1 dark:text-white">{heading}</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{count}</p>
          </div>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}
