"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Props interface for the component to receive the dynamic data
interface PrinciplesCountBarChartProps {
  principleCounts: {
    transparency: number
    justiceAndFairness: number
    nonMaleficence: number
    responsibility: number
    privacy: number
    beneficence: number
    freedomAndAutonomy: number
    trust: number
    sustainability: number
    dignity: number
    solidarity: number
  }
}

export function PrinciplesCountBarChartComponent({
  principleCounts,
}: PrinciplesCountBarChartProps) {
  // Dynamic chart data based on the principleCounts prop
  const chartData = [
    { name: "Transparency", count: principleCounts.transparency, fill: "var(--color-transparency)" },
    { name: "Justicefairness", count: principleCounts.justiceAndFairness, fill: "var(--color-justiceAndFairness)" },
    { name: "NonMaleficence", count: principleCounts.nonMaleficence, fill: "var(--color-nonMaleficence)" },
    { name: "Responsibility", count: principleCounts.responsibility, fill: "var(--color-responsibility)" },
    { name: "Privacy", count: principleCounts.privacy, fill: "var(--color-privacy)" },
    { name: "Beneficence", count: principleCounts.beneficence, fill: "var(--color-beneficence)" },
    { name: "FreedomAutonomy", count: principleCounts.freedomAndAutonomy, fill: "var(--color-freedomAndAutonomy)" },
    { name: "Trust", count: principleCounts.trust, fill: "var(--color-trust)" },
    { name: "Sustainability", count: principleCounts.sustainability, fill: "var(--color-sustainability)" },
    { name: "Dignity", count: principleCounts.dignity, fill: "var(--color-dignity)" },
    { name: "Solidarity", count: principleCounts.solidarity, fill: "var(--color-solidarity)" },
  ]

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
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Principles Count</CardTitle>
        <CardDescription>Ethical Principles Total Count With Total Resources</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value.toLowerCase().replace(/ & /g, "").replace(/\s+/g, "") as keyof typeof chartConfig]?.label
              }
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
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
        Total counts for each ethical principle
        </div>
      </CardFooter>
    </Card>
  )
}
