/*this is a weak method to find org types. Once user added any org that is not on this list, I have to
update this code as well. so WIP for better code. no time now.*/

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface ResourceCounts {
  totalResources: number
  governmentCount: number
  privateCount: number
  nonprofitCount: number
  othersCount: number
}

export async function getResourcesByOrganizationType(): Promise<ResourceCounts> {
  // Group resources by `organizationType` and get the count for each type
  const resourceData = await prisma.resource.groupBy({
    by: ['organizationType'], // Group by organization type
    _count: {
      id: true, // Counting the number of resources for each type
    },
  })

  // Calculate the total number of resources
  const totalResources = resourceData.reduce((acc, resource) => acc + resource._count.id, 0)

  // Helper function to get the count for a specific organization type
  const getCount = (type: string) => resourceData
    .filter((r) => Array.isArray(r.organizationType)
      ? r.organizationType.includes(type)
      : r.organizationType === type)
    .reduce((acc, curr) => acc + curr._count.id, 0)

  // Get the count for Government, Private, and Non-profit types
  const governmentCount = getCount('Government')
  const privateCount = getCount('Private')
  const nonprofitCount = getCount('Non-profit')

  // Combine the counts for all other organization types
  const othersCount = resourceData
    .filter((r) => {
      const organizationType = Array.isArray(r.organizationType)
        ? r.organizationType
        : [r.organizationType]

      // List of types that will not be part of "Others"
      const excludedTypes = ['Government', 'Private', 'Non-profit']
      return !organizationType.some((type) => excludedTypes.includes(type))
    })
    .reduce((acc, curr) => acc + curr._count.id, 0)

  // Return the counts for total, Government, Private, Non-profit, and Others
  return {
    totalResources,
    governmentCount,
    privateCount,
    nonprofitCount,
    othersCount,
  }
}




