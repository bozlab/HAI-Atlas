// prisma/seed.ts

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const countriesFilePath = path.join(__dirname, 'countries_and_ids.txt');
  const countriesData = fs.readFileSync(countriesFilePath, 'utf-8');

  const countries = countriesData.split('\n').slice(1).map((line:any) => {
    const [name, countryCode] = line.split('\t');
    return { name, countryCode };
  });

  for (const country of countries) {
    await prisma.country.updateMany({
      where: { name: country.name }, // Match by name for existing records
      data: {
        countryCode: country.countryCode,
      },
    });
  }

  console.log('Countries updated with countryCode!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });





