// prisma/nlpService.ts

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface NLPPrincipleCounts {
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

export async function getNLPPrincipleCounts(): Promise<NLPPrincipleCounts> {
  // Aggregate all fields by summing their values
  const result = await prisma.nLP.aggregate({
    _sum: {
      transparency: true,
      justiceAndFairness: true,
      nonMaleficence: true,
      responsibility: true,
      privacy: true,
      beneficence: true,
      freedomAndAutonomy: true,
      trust: true,
      sustainability: true,
      dignity: true,
      solidarity: true,
    },
  })

  // Return the aggregated sum of each principle
  return {
    transparency: result._sum.transparency || 0,
    justiceAndFairness: result._sum.justiceAndFairness || 0,
    nonMaleficence: result._sum.nonMaleficence || 0,
    responsibility: result._sum.responsibility || 0,
    privacy: result._sum.privacy || 0,
    beneficence: result._sum.beneficence || 0,
    freedomAndAutonomy: result._sum.freedomAndAutonomy || 0,
    trust: result._sum.trust || 0,
    sustainability: result._sum.sustainability || 0,
    dignity: result._sum.dignity || 0,
    solidarity: result._sum.solidarity || 0,
  }
}
