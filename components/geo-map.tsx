'use client';

import React, { useState, useEffect } from 'react';
import { ResponsiveChoroplethCanvas } from '@nivo/geo';
import { CountryGeoMapData } from '@/services/geo-map-service';
import worldCountries from '@/data/world_countries.json';

interface GeoMapProps {
  data: CountryGeoMapData[];
}

function useWindowWidth() {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    handleResize(); // Set initial width
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

const GeoMap: React.FC<GeoMapProps> = ({ data }) => {
  const width = useWindowWidth();

  let projectionScale = 100;
  if (width >= 1024) {
    projectionScale = 350;
  } else if (width >= 768) {
    projectionScale = 250;
  } else {
    projectionScale = 150;
  }

  return (
    <div className="h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]">
      <ResponsiveChoroplethCanvas
        tooltip={({ feature }) => {
          const countryId = (feature as any).properties?.iso_a3 || 'Unknown';
          const countryName = (feature as any).properties?.name || 'Unknown';
          const countryData = data.find((item) => item.id === countryId);

          return (
            <div
              style={{
                background: '#fff',
                color: '#000',
                padding: '10px',
                borderRadius: '4px',
                border: `1px solid rgba(0, 0, 0, 0.1)`,
                maxWidth: '300px',
              }}
            >
              <strong>{countryName}</strong>
              <br />
              <strong>Resources: {countryData?.value || 0}</strong>
              <ul>
                {countryData?.resourceList.map((resource) => (
                  <li key={resource.id}>
                    <a
                      href={resource.mainLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#000' }}
                    >
                      Resource {resource.id} - Published on{' '}
                      {new Date(resource.publicationDate).toLocaleDateString()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          );
        }}
        data={data}
        features={worldCountries.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors="nivo"
        domain={[0, 1000000]}
        projectionType="naturalEarth1"
        projectionScale={projectionScale}
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





