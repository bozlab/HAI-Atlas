"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Props interface for the component to receive the dynamic data
interface PrinciplesCountBarChartProps {
  principleCounts: {
    transparency: number;
    justiceAndFairness: number;
    nonMaleficence: number;
    responsibility: number;
    privacy: number;
    beneficence: number;
    freedomAndAutonomy: number;
    trust: number;
    sustainability: number;
    dignity: number;
    solidarity: number;
  };
}

export function PrinciplesCountBarChartComponent({
  principleCounts,
}: PrinciplesCountBarChartProps) {
  const chartData = [
    {
      name: "Transparency",
      count: principleCounts.transparency,
      fill: "var(--color-transparency)",
    },
    {
      name: "Justice and Fairness",
      count: principleCounts.justiceAndFairness,
      fill: "var(--color-justiceAndFairness)",
    },
    {
      name: "Non-Maleficence",
      count: principleCounts.nonMaleficence,
      fill: "var(--color-nonMaleficence)",
    },
    {
      name: "Responsibility",
      count: principleCounts.responsibility,
      fill: "var(--color-responsibility)",
    },
    {
      name: "Privacy",
      count: principleCounts.privacy,
      fill: "var(--color-privacy)",
    },
    {
      name: "Beneficence",
      count: principleCounts.beneficence,
      fill: "var(--color-beneficence)",
    },
    {
      name: "Freedom and Autonomy",
      count: principleCounts.freedomAndAutonomy,
      fill: "var(--color-freedomAndAutonomy)",
    },
    { name: "Trust", count: principleCounts.trust, fill: "var(--color-trust)" },
    {
      name: "Sustainability",
      count: principleCounts.sustainability,
      fill: "var(--color-sustainability)",
    },
    {
      name: "Dignity",
      count: principleCounts.dignity,
      fill: "var(--color-dignity)",
    },
    {
      name: "Solidarity",
      count: principleCounts.solidarity,
      fill: "var(--color-solidarity)",
    },
  ];

  const chartConfig = {
    count: {
      label: "Count",
    },
    transparency: {
      label: "Transparency",
      color: "hsl(var(--chart-1))",
    },
    justiceAndFairness: {
      label: "Justice & Fairness",
      color: "hsl(var(--chart-2))",
    },
    nonMaleficence: {
      label: "Non-Maleficence",
      color: "hsl(var(--chart-3))",
    },
    responsibility: {
      label: "Responsibility",
      color: "hsl(var(--chart-4))",
    },
    privacy: {
      label: "Privacy",
      color: "hsl(var(--chart-5))",
    },
    beneficence: {
      label: "Beneficence",
      color: "hsl(var(--chart-1))",
    },
    freedomAndAutonomy: {
      label: "Freedom & Autonomy",
      color: "hsl(var(--chart-2))",
    },
    trust: {
      label: "Trust",
      color: "hsl(var(--chart-3))",
    },
    sustainability: {
      label: "Sustainability",
      color: "hsl(var(--chart-4))",
    },
    dignity: {
      label: "Dignity",
      color: "hsl(var(--chart-5))",
    },
    solidarity: {
      label: "Solidarity",
      color: "hsl(var(--chart-1))",
    },
  };

  // Define the custom tick style for mobile and larger screens
  const customTick = (props: any) => {
    const { x, y, payload } = props;
    const value = payload.value;

    // Use CSS media queries to adjust font size based on the screen width
    const tickFontSize = window.innerWidth < 768 ? "10px" : "14px"; // Smaller on mobile

    return (
      <text
        x={x}
        y={y}
        textAnchor="end"
        fill="#666"
        fontSize={tickFontSize}
        dy={2}
      >
        {chartConfig[
          value.toLowerCase().replace(/\s+/g, "") as keyof typeof chartConfig
        ]?.label || value}
      </text>
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-col items-center text-center">
        <CardTitle className="text-lg font-semibold">Principles Count</CardTitle>
        <CardDescription>
          Ethical Principles Total Count With Total Resources
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 120,
            }}
          >
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={0}
              axisLine={false}
              tick={customTick} // Use the custom tick for dynamic font size
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
