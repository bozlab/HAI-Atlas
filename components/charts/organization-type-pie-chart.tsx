"use client";

import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function OrganizationTypePieChartComponent({
  totalResources,
  governmentCount,
  privateCount,
  nonprofitCount,
  othersCount,
}: {
  totalResources: number;
  governmentCount: number;
  privateCount: number;
  nonprofitCount: number;
  othersCount: number;
}) {
  // Define the chart data based on the various organization type counts
  const chartData = [
    {
      type: "Government",
      count: governmentCount,
      fill: "var(--color-government)",
    },
    { type: "Private", count: privateCount, fill: "var(--color-private)" },
    {
      type: "Non-profit",
      count: nonprofitCount,
      fill: "var(--color-nonprofit)",
    },
    {
      type: "others",
      count: othersCount,
      fill: "var(--color-others)",
    },
  ];

  const chartConfig = {
    count: {
      label: "Organization Type",
    },
    government: {
      label: "Government",
      color: "hsl(var(--chart-1))",
    },
    private: {
      label: "Private",
      color: "hsl(var(--chart-2))",
    },
    nonprofit: {
      label: "Non-profit",
      color: "hsl(var(--chart-3))",
    },
    others: {
      label: "others",
      color: "hsl(var(--chart-4))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-lg font-semibold">
          Organization Type
        </CardTitle>
        <CardDescription>{totalResources} Total Resources</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="count" label nameKey="type" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
