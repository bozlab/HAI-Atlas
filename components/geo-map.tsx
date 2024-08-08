"use client"

// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/geo
import { ResponsiveGeoMap } from "@nivo/geo";
import worldCountries from "./../data/world_countries.json";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const MyResponsiveGeoMap = () => (
  <ResponsiveGeoMap
    features={worldCountries.features}
    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
    projectionTranslation={[0.5, 0.5]}
    projectionType="orthographic"
    projectionScale={250}
    projectionRotation={[0, 0, 0]}
    fillColor="#eeeeee"
    borderWidth={0.5}
    borderColor="#333333"
    enableGraticule={true}
    graticuleLineColor="#666666"
  />
);
