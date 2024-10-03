"use client";

import React, { useEffect, useState, useRef } from "react";
import { ResponsiveChoroplethCanvas } from "@nivo/geo";
import { CountryGeoMapData } from "@/services/geo-map-service";
import worldCountries from "@/data/world_countries.json";

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
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

const GeoMap: React.FC<GeoMapProps> = ({ data }) => {
  const width = useWindowWidth();
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const tooltipRef = useRef<HTMLDivElement>(null); // Reference for the tooltip

  let projectionScale = 100;
  if (width >= 1024) {
    projectionScale = 350;
  } else if (width >= 768) {
    projectionScale = 250;
  } else {
    projectionScale = 150;
  }

  const handleCountryClick = (feature: any) => {
    const countryId = feature.id || "Unknown"; // Use `id` from GeoJSON
    const countryData = data.find((item) => item.id === countryId);
    if (countryData) {
      setSelectedCountry({
        name: feature.properties?.name || "Unknown",
        data: countryData,
      });
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      tooltipRef.current &&
      !tooltipRef.current.contains(event.target as Node)
    ) {
      setSelectedCountry(null); // Hide the tooltip if clicked outside
    }
  };

  useEffect(() => {
    // Add event listener to detect clicks outside the tooltip
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup the event listener when the component is unmounted
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] relative">
      <ResponsiveChoroplethCanvas
        tooltip={() => null} // Disable hover-based tooltip
        onClick={(feature) => handleCountryClick(feature)} // Show tooltip on click
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
      {/* Show tooltip if a country is clicked */}
      {selectedCountry && (
        <div
          ref={tooltipRef} // Attach ref to the tooltip element
          className="bg-white dark:bg-gray-800 dark:text-gray-200 text-black p-3 rounded-md shadow-md border border-gray-300 dark:border-gray-700 max-w-[300px] absolute"
          style={{
            maxHeight: "400px",
            overflowY: "auto",
            top: "20%",
            left: "20%",
            zIndex: 1000, // Ensure the tooltip appears above other content
            pointerEvents: "auto", // Make sure it's clickable
          }}
        >
          <strong>{selectedCountry.name}</strong>
          <br />
          <strong>
            Resources: {selectedCountry.data.resourceList?.length ?? 0}
          </strong>
          {selectedCountry.data.resourceList?.length > 0 ? (
            <ul className="mt-2 space-y-1 max-h-[200px] overflow-y-auto">
              {selectedCountry.data.resourceList.map((resource: any) => (
                <li key={resource.id}>
                  <a
                    href={resource.mainLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 dark:text-blue-300"
                  >
                    Resource {resource.name} - Published on{" "}
                    {new Date(resource.publicationDate).toLocaleDateString()}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div>No resources available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default GeoMap;
