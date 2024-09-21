// prisma/resourceService.ts

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface ResourceCounts {
  totalResources: number
  governmentCount: number
  privateCount: number
}

export async function getResourcesByOrganizationType(): Promise<ResourceCounts> {
  // Group resources by `organizationType` and get the count for each type
  const resourceData = await prisma.resource.groupBy({
    by: ['organizationType'], // Group by organization type (e.g., Government, Private)
    _count: {
      id: true, // Counting the number of resources for each type
    },
  })

  // Calculate the total number of resources
  const totalResources = resourceData.reduce((acc, resource) => acc + resource._count.id, 0)

  // Get the count of Government and Private resources
  const governmentCount = resourceData
    .filter((r) => Array.isArray(r.organizationType)
      ? r.organizationType.includes('Government')
      : r.organizationType === 'Government')
    .reduce((acc, curr) => acc + curr._count.id, 0)

  const privateCount = resourceData
    .filter((r) => Array.isArray(r.organizationType)
      ? r.organizationType.includes('Private')
      : r.organizationType === 'Private')
    .reduce((acc, curr) => acc + curr._count.id, 0)

  // Return the total, government, and private resource counts
  return {
    totalResources,
    governmentCount,
    privateCount,
  }
}

