import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Find the country in data/world_countries.json. Sometimes the country name will be bit tricky to find
  // for example, in there, there is no United Kingdom. there is only "England". use a json visualizer to read the json file.
  const uk = await prisma.country.findUnique({
    where: { name: 'England' },
  });

  if (!uk) {
    console.error('Country "England" not found in the database');
    process.exit(1);
  }

  // Create a new Resource and connect it to the existing UK entry
  const resource = await prisma.resource.create({
    data: {
      mainLink: 'https://www.turing.ac.uk/sites/default/files/2019-08/understanding_artificial_intelligence_ethics_and_safety.pdf',
      include: true,
      publicationDate: new Date('2019-01-01'), // Assuming January 1st as the publication date was not fully provided
      organizationType: ['Research Institute', 'Private'],
      publisher: ['Alan Turing Institute'],
      additionalLinks: [],
      summary:
        "This guide provides ethical principles for AI development in the public sector, emphasizing fairness, transparency, accountability, and sustainability for responsible innovation.",
      countries: {
        connect: [{ id: uk.id }],
      },
      nlp: {
        create: {
          transparency: 157,
          justiceAndFairness: 167,
          nonMaleficence: 198,
          responsibility: 96,
          privacy: 15,
          beneficence: 5,
          freedomAndAutonomy: 12,
          trust: 16,
          sustainability: 18,
          dignity: 5,
          solidarity: 3,
        },
      },
    },
    include: {
      countries: true, // Include related countries in the response
    },
  });

  console.log('Resource created:', resource);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


// use "npm run seed" to run the script. 


