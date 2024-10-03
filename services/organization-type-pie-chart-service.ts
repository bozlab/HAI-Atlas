/*this is a weak method to find org types. Once user added any org that is not on this list, I have to
update this code as well. so WIP for better code. no time now.*/

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface ResourceCounts {
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

  // Get the count for each organization type
  const governmentCount = getCount('Government')
  const privateCount = getCount('Private')
  const nonprofitCount = getCount('Non-profit')
  const intergovernmentalCount = getCount('Intergovernmental')
  const interOrganizationalPartnershipCount = getCount('Inter-organizational partnership')
  const governmentRegulatedProfessionalOrgCount = getCount('Government-regulated professional organization')
  const multisocietyConsortiumCount = getCount('Multisociety consortium')
  const researchInitiativeCount = getCount('Research Initiative')
  const independentGovernmentalOrgCount = getCount('Independent governmental organization')
  const internationalNGOCount = getCount('International non-governmental organization')
  const specializedAgencyCount = getCount('Specialized agency')
  const globalTradeAssociationCount = getCount('Global trade association')
  const multisectorConsortiumCount = getCount('Multisector consortium')

  // Return the counts for all organization types
  return {
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
  }
}



