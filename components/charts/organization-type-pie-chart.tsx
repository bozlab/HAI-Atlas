// components/OrganizationTypePieChartComponent.tsx

"use client"
import { Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export function OrganizationTypePieChartComponent({
  totalResources,
  governmentCount,
  privateCount,
}: {
  totalResources: number
  governmentCount: number
  privateCount: number
}) {
  // Define the chart data based on Government and Private counts
  const chartData = [
    { browser: "Government", count: governmentCount, fill: "var(--color-government)" },
    { browser: "Private", count: privateCount, fill: "var(--color-private)" },
  ]

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
      color: "hsl(var(--chart-3))",
    },
   
  } satisfies ChartConfig
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Organization Type</CardTitle>
        <CardDescription>{totalResources} Total Resources</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
        config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="count" label nameKey="browser" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Resources count based on published organization type
        </div>
      </CardFooter>
    </Card>
  )
}
