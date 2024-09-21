'use client';

import { ResponsiveChoroplethCanvas } from '@nivo/geo';
import { CountryGeoMapData } from '@/services/geo-map-service'; // Import the correct types
import worldCountries from '@/data/world_countries.json'; // GeoJSON world map

interface GeoMapProps {
  data: CountryGeoMapData[]; // Accept the fetched data as props
}

// const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

const GeoMap: React.FC<GeoMapProps> = ({ data }) => {
  return (
    <div style={{ height: '700px' }}>
      <ResponsiveChoroplethCanvas
            // Custom tooltip function
        tooltip={({ feature }) => {
          // Use the correct key from your GeoJSON properties for the country code
          const countryId = (feature as any).properties?.iso_a3 || 'Unknown'; // Adjust according to the key in your GeoJSON
          const countryName = (feature as any).properties?.name || 'Unknown'; // Access country name from properties
          
          const countryData = data.find((item) => item.id === countryId); // Find the data by country code

          return (
            <div
              style={{
                background: '#fff',
                color: '#000',
                padding: '10px',
                borderRadius: '4px',
                border: `1px solid ${'rgba(0, 0, 0, 0.1)'}`,
                maxWidth: '300px',
              }}
            >
              <strong>{countryName}</strong>
              <br />
              <strong>Resources: {countryData?.value || 0}</strong>
              <ul>
                {countryData?.resourceList.map((resource) => (
                  <li key={resource.id}>
                    <a href={resource.mainLink} target="_blank" rel="noopener noreferrer" style={{ color:'#000' }}>
                      Resource {resource.id} - Published on {new Date(resource.publicationDate).toLocaleDateString()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          );
        }}
        data={data} // Pass the fetched data
        features={worldCountries.features} // GeoJSON features for the map
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors="RdBu"
        domain={[0, 1000000]} // Adjust based on your resource counts
        projectionType="naturalEarth1"
        projectionScale={350}
        projectionTranslation={[0.5, 0.5]}
        projectionRotation={[0, 0, 0]}
        enableGraticule={true}
        fillColor="#eeeeee"
        borderWidth={0.5}
        borderColor="#333333"
        graticuleLineColor="#666666"
      />
    </div>
  );
};

export default GeoMap;




