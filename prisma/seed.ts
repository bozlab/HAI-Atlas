import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import csvParser from 'csv-parser';

const prisma = new PrismaClient();

async function main() {
  let addedResourcesCount = 0;

  // Read CSV file from the same folder
  fs.createReadStream('prisma/HAI-Atlas-Paper-final_links.csv') // Adjust file path as per your setup
    .pipe(csvParser({
      mapHeaders: ({ header, index }): string | null => {
        const headersMap: { [key: number]: string } = {
          0: 'mainLink', // A column (Main Link)
          1: 'includeYN', // B column (Include(Y/N))
          2: 'name', // C column (Name of the document)
          3: 'country', // D column (Country)
          4: 'publisher', // E column (Publisher)
          5: 'additionalLinks', // F column (Link to main Document)
          6: 'publicationDate', // G column (Publication Date)
          7: 'organizationType', // H column (Organization Type)
          8: 'summary', // I column (Text Summary)
          9: 'nlpData' // J column (Text-mining, NLP data)
        };
        return headersMap[index] || null;
      }
    }))
    .on('data', async (row) => {
      try {
        // Extract fields from the CSV row
        const mainLink = row.mainLink ? row.mainLink.trim() : null;

        // Ensure mainLink is not null or empty
        if (!mainLink || mainLink === '') {
          console.error('Main Link is missing or empty for the document:', row.name);
          return; // Skip this record if mainLink is missing or empty
        }

        if (row.country === 'Global') return; // Skip if country is "Global"

        // Convert "Include(Y/N)" field from 1 to true
        const include = row.includeYN === '1';

        // Handle country connections
        const countries = [];
        const countryNames = row.country.split(',').map((c: any) => c.trim());
        let validCountries = true;

        for (const countryName of countryNames) {
          const country = await prisma.country.findUnique({
            where: { name: countryName },
          });
          if (country) {
            countries.push({ id: country.id });
          } else {
            console.error(`Country "${countryName}" not found in the database. Skipping record.`);
            validCountries = false;
            break; // Skip the record if any country is missing
          }
        }

        if (!validCountries) return; // Skip if any country was not found

        // Parse NLP data from the 'Text-mining' column (which corresponds to your J column)
        const nlpLines = row['nlpData'].split('\n').map((line: string) => line.trim());
        const nlpValues: { [key: string]: number } = {};

        nlpLines.forEach((line:any) => {
          const [key, value] = line.split(':').map((part: string) => part.trim());

          // Map NLP keys correctly (handling hyphens and spaces)
          const nlpKeyMapping: { [key: string]: string } = {
            'Transparency': 'transparency',
            'Justice and fairness': 'justiceAndFairness',
            'Non-maleficence': 'nonMaleficence',
            'Responsibility': 'responsibility',
            'Privacy': 'privacy',
            'Beneficence': 'beneficence',
            'Freedom and autonomy': 'freedomAndAutonomy',
            'Trust': 'trust',
            'Sustainability': 'sustainability',
            'Dignity': 'dignity',
            'Solidarity': 'solidarity',
          };

          const mappedKey = nlpKeyMapping[key] || key.toLowerCase().replace(/\s+/g, '');
          nlpValues[mappedKey] = parseInt(value, 10) || 0;
        });

        // Default NLP values if missing in the CSV row
        const nlpDefaults = {
          transparency: 0,
          justiceAndFairness: 0,
          nonMaleficence: 0,
          responsibility: 0,
          privacy: 0,
          beneficence: 0,
          freedomAndAutonomy: 0,
          trust: 0,
          sustainability: 0,
          dignity: 0,
          solidarity: 0,
        };

        // Merge parsed NLP values with default values
        const nlp = { ...nlpDefaults, ...nlpValues };

        // Create a new resource
        const resource = await prisma.resource.create({
          data: {
            mainLink, // Ensure mainLink is provided
            include,
            publicationDate: new Date(row.publicationDate || '2000-01-01'), // Default date if missing
            organizationType: row.organizationType.split(',').map((type: string) => type.trim()), // Split by commas
            publisher: row.publisher.split(',').map((pub: string) => pub.trim()), // Handle multiple publishers
            additionalLinks: row.additionalLinks ? [row.additionalLinks] : [], // Add as array if present
            summary: row.name + ": " + row.summary, // Combine name and summary
            countries: {
              connect: countries, // Connect the countries found
            },
            nlp: {
              create: {
                transparency: nlp.transparency,
                justiceAndFairness: nlp.justiceAndFairness,
                nonMaleficence: nlp.nonMaleficence,
                responsibility: nlp.responsibility,
                privacy: nlp.privacy,
                beneficence: nlp.beneficence,
                freedomAndAutonomy: nlp.freedomAndAutonomy,
                trust: nlp.trust,
                sustainability: nlp.sustainability,
                dignity: nlp.dignity,
                solidarity: nlp.solidarity,
              },
            },
          },
          include: {
            countries: true, // Include the related countries in the response
          },
        });

        // Keep track of added resources
        addedResourcesCount++;
        console.log(`Resource added:`, resource);
      } catch (error: any) {
        console.error(`Error processing record: ${error.message}`);
      }
    })
    .on('end', () => {
      console.log(`Finished processing CSV. Total resources added: ${addedResourcesCount}`);
    });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });






