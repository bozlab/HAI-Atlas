import Link from "next/link";

import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import RotatableGeoMap from "@/components/geo-map";
import { OrganizationTypePieChartComponent } from "@/components/charts/organization-type-pie-chart";
import { getResourcesByOrganizationType } from "@/services/organization-type-pie-chart-service";
import { PrinciplesCountBarChartComponent } from "@/components/charts/principles-count-bar-chart";
import { getNLPPrincipleCounts } from "@/services/principles-count-bar-chart-service";
import { getTopCountriesByResourceCount } from "@/services/top-countries-count-bar-chart-service";
import { TopCountriesCountBarChartComponent } from "@/components/charts/top-countries-count-bar-chart";
import { getCountryGeoMapData } from "@/services/geo-map-service";

export default async function HomePage() {
  const { totalResources, governmentCount, privateCount } =
    await getResourcesByOrganizationType();
  const principleCounts = await getNLPPrincipleCounts();
  const topCountries = await getTopCountriesByResourceCount();
  const geoData = await getCountryGeoMapData();
  return (
    <>
      <section className="space-y-6 pb-6 pt-6 md:pb-8 md:pt-10 lg:py-18">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Link
            href={siteConfig.links.twitter}
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
            target="_blank"
          >
            Follow us on Twitter
          </Link>
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Welcome to Health-AI Ethics Atlas
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            An interactive web application designed to illustrate the
            application and development of ethical concepts in medical AI
            (Artificial Intelligence) across various nations.
          </p>
          <div className="space-x-4">
            <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
              Browse
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              Contribute
            </Link>
          </div>
        </div>
      </section>
      <section id="geo map">
        <div className="container" style={{ width: "100%", height: "630px" }}>
          <RotatableGeoMap data={geoData} />
        </div>
      </section>

      <section className="py-6 md:py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-4 md:col-span-2">
              <PrinciplesCountBarChartComponent
                principleCounts={principleCounts}
              />
            </div>
            <div className="col-span-4 md:col-span-1">
              <OrganizationTypePieChartComponent
                totalResources={totalResources}
                governmentCount={governmentCount}
                privateCount={privateCount}
              />
            </div>
            <div className="col-span-4 md:col-span-1">
              <TopCountriesCountBarChartComponent topCountries={topCountries} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
