// prisma/geoMapService.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface CountryGeoMapData {
  id: string; // Country code (e.g., 'USA', 'AFG')
  value: number; // Resource count for that country
  resourceList: Array<{
    id: number;
    mainLink: string;
    publicationDate: Date;
    organizationType: string[];
  }>;
}

export async function getCountryGeoMapData(): Promise<CountryGeoMapData[]> {
  // Fetch all countries with their resources
  const result = await prisma.country.findMany({
    where: {
      resources: {
        some: {}, // Only countries with resources
      },
    },
    select: {
      countryCode: true, // Fetch the country code
      resources: {
        select: {
          id: true,
          mainLink: true,
          publicationDate: true,
          organizationType: true,
        },
      },
    },
  });

  // Transform the result into the format expected for the geomap
  const transformedResult = result
    .filter((country) => country.resources.length > 0) // Only include countries with resources
    .map((country) => ({
      id: country.countryCode ?? 'Unknown', // Use 'Unknown' for null countryCode
      value: country.resources.length, // Number of resources
      resourceList: country.resources.map((resource) => ({
        id: resource.id,
        mainLink: resource.mainLink,
        publicationDate: resource.publicationDate,
        organizationType: resource.organizationType,
      })),
    }));

  return transformedResult;
}



