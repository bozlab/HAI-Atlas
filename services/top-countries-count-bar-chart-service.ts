// prisma/resourceService.ts

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface CountryResourceCount {
  country: string
  resourceCount: number
}

export async function getTopCountriesByResourceCount(): Promise<CountryResourceCount[]> {
  // Fetch all resources with their related countries
  const resources = await prisma.resource.findMany({
    include: {
      countries: true, // Include related countries
    },
  })

  // Create a dictionary to count the number of resources per country
  const countryCount: { [key: string]: number } = {}

  resources.forEach((resource) => {
    resource.countries.forEach((country) => {
      if (countryCount[country.name]) {
        countryCount[country.name] += 1
      } else {
        countryCount[country.name] = 1
      }
    })
  })

  // Convert the dictionary to an array and sort it by the resource count
  const sortedCountries = Object.entries(countryCount)
    .map(([country, resourceCount]) => ({ country, resourceCount }))
    .sort((a, b) => b.resourceCount - a.resourceCount)
    .slice(0, 3) // Get the top 3 countries

  return sortedCountries
}
