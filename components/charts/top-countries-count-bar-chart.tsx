"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

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

// Props interface for the component
interface TopCountriesCountBarChartProps {
  topCountries: { country: string; resourceCount: number }[];
}

export function TopCountriesCountBarChartComponent({
  topCountries,
}: TopCountriesCountBarChartProps) {
  // Dynamic chart config for country count
  const chartConfig = {
    resourceCount: {
      label: "Resources",
      color: "hsl(var(--chart-1))",
    },
    country: {
      color: "hsl(var(--background))",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader className="flex flex-col items-center text-center">
        <CardTitle className="text-lg font-semibold">Top 3 Countries</CardTitle>
        <CardDescription>
          Showing the top countries by the number of resources
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={topCountries}
            layout="vertical"
            margin={{ right: 16 }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="country"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={100} // Adjust based on longest country name
            />
            <XAxis dataKey="resourceCount" type="number" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="resourceCount"
              layout="vertical"
              fill="var(--color-resourceCount)"
              radius={4}
            >
              <LabelList
                dataKey="country"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="resourceCount"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
