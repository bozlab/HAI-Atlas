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
  nonprofitCount,
  intergovernmentalCount,
  interOrganizationalPartnershipCount,
  governmentRegulatedProfessionalOrgCount,
  multisocietyConsortiumCount,
  researchInitiativeCount,
  independentGovernmentalOrgCount,
  internationalNGOCount,
  specializedAgencyCount,
  globalTradeAssociationCount,
  multisectorConsortiumCount,
}: {
  totalResources: number
  governmentCount: number
  privateCount: number
  nonprofitCount: number
  intergovernmentalCount: number
  interOrganizationalPartnershipCount: number
  governmentRegulatedProfessionalOrgCount: number
  multisocietyConsortiumCount: number
  researchInitiativeCount: number
  independentGovernmentalOrgCount: number
  internationalNGOCount: number
  specializedAgencyCount: number
  globalTradeAssociationCount: number
  multisectorConsortiumCount: number
}) {
  // Define the chart data based on the various organization type counts
  const chartData = [
    { type: "Government", count: governmentCount, fill: "var(--color-government)" },
    { type: "Private", count: privateCount, fill: "var(--color-private)" },
    { type: "Non-profit", count: nonprofitCount, fill: "var(--color-nonprofit)" },
    { type: "Intergovernmental", count: intergovernmentalCount, fill: "var(--color-intergovernmental)" },
    { type: "Inter-organizational partnership", count: interOrganizationalPartnershipCount, fill: "var(--color-interpartnership)" },
    { type: "Government-regulated professional organization", count: governmentRegulatedProfessionalOrgCount, fill: "var(--color-government-regulated)" },
    { type: "Multisociety consortium", count: multisocietyConsortiumCount, fill: "var(--color-multisociety)" },
    { type: "Research Initiative", count: researchInitiativeCount, fill: "var(--color-research-initiative)" },
    { type: "Independent governmental organization", count: independentGovernmentalOrgCount, fill: "var(--color-independent-governmental)" },
    { type: "International non-governmental organization", count: internationalNGOCount, fill: "var(--color-international-ngo)" },
    { type: "Specialized agency", count: specializedAgencyCount, fill: "var(--color-specialized-agency)" },
    { type: "Global trade association", count: globalTradeAssociationCount, fill: "var(--color-global-trade)" },
    { type: "Multisector consortium", count: multisectorConsortiumCount, fill: "var(--color-multisector)" },
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
      color: "hsl(var(--chart-2))",
    },
    nonprofit: {
      label: "Non-profit",
      color: "hsl(var(--chart-3))",
    },
    intergovernmental: {
      label: "Intergovernmental",
      color: "hsl(var(--chart-4))",
    },
    interOrganizationalPartnership: {
      label: "Inter-organizational Partnership",
      color: "hsl(var(--chart-5))",
    },
    governmentRegulatedProfessionalOrg: {
      label: "Government-regulated Professional Organization",
      color: "hsl(var(--chart-6))",
    },
    multisocietyConsortium: {
      label: "Multisociety Consortium",
      color: "hsl(var(--chart-7))",
    },
    researchInitiative: {
      label: "Research Initiative",
      color: "hsl(var(--chart-8))",
    },
    independentGovernmentalOrg: {
      label: "Independent Governmental Organization",
      color: "hsl(var(--chart-9))",
    },
    internationalNGO: {
      label: "International Non-Governmental Organization",
      color: "hsl(var(--chart-10))",
    },
    specializedAgency: {
      label: "Specialized Agency",
      color: "hsl(var(--chart-11))",
    },
    globalTradeAssociation: {
      label: "Global Trade Association",
      color: "hsl(var(--chart-12))",
    },
    multisectorConsortium: {
      label: "Multisector Consortium",
      color: "hsl(var(--chart-13))",
    },
  } satisfies ChartConfig

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-lg font-semibold">Organization Type</CardTitle>
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
  )
}

