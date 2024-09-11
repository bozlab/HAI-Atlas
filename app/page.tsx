import Link from "next/link";

import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoveDownLeft, MoveUpRight, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import RotatableGeoMap  from "@/components/geo-map";
import { OrganizationTypePieChartComponent } from "@/components/charts/organization-type-pie-chart";
import { PublishedYearsBarChartComponent } from "@/components/charts/published-years-bar-chart";

export default function HomePage() {
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
        <div className="container" style={{ width: "100%", height: "700px" }}>
          <RotatableGeoMap />
        </div>
      </section>
      <section
        id="statistics"
        className="container space-y-5 py-3 dark:bg-transparent md:py-3 lg:py-1"
      >
        <div className="w-full py-10 lg:py-20">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="flex gap-4 flex-col items-start">
                <div>
                  <Badge>Platform</Badge>
                </div>
                <div className="flex gap-2 flex-col">
                  <h2 className="text-xl md:text-3xl tracking-tighter lg:max-w-xl font-regular text-left">
                    This is the start of something new
                  </h2>
                  <p className="text-lg lg:max-w-sm leading-relaxed tracking-tight text-muted-foreground text-left">
                    Managing a small business today is already tough. Avoid
                    further complications by ditching outdated, tedious trade
                    methods. Our goal is to streamline SMB trade, making it
                    easier and faster than ever.
                  </p>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div className="grid text-left grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 w-full gap-2">
                  <div className="flex bg-muted gap-0 flex-col justify-between p-6 border rounded-md">
                    <MoveUpRight className="w-4 h-4 mb-10 text-primary" />
                    <h2 className="text-4xl tracking-tighter max-w-xl text-left font-regular flex flex-row gap-4 items-end">
                      500.000
                      <span className="text-muted-foreground text-sm tracking-normal">
                        +20.1%
                      </span>
                    </h2>
                    <p className="text-base leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
                      Monthly active users
                    </p>
                  </div>
                  <div className="flex bg-muted gap-0 flex-col justify-between p-6 border rounded-md">
                    <MoveDownLeft className="w-4 h-4 mb-10 text-destructive" />
                    <h2 className="text-4xl tracking-tighter max-w-xl text-left font-regular flex flex-row gap-4 items-end">
                      20.105
                      <span className="text-muted-foreground text-sm tracking-normal">
                        -2%
                      </span>
                    </h2>
                    <p className="text-base leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
                      Daily active users
                    </p>
                  </div>
                  <div className="flex bg-muted gap-0 flex-col justify-between p-6 border rounded-md">
                    <MoveUpRight className="w-4 h-4 mb-10 text-primary" />
                    <h2 className="text-4xl tracking-tighter max-w-xl text-left font-regular flex flex-row gap-4 items-end">
                      $523.520
                      <span className="text-muted-foreground text-sm tracking-normal">
                        +8%
                      </span>
                    </h2>
                    <p className="text-base leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
                      Monthly recurring revenue
                    </p>
                  </div>
                  <div className="flex bg-muted gap-0 flex-col justify-between p-6 border rounded-md">
                    <MoveUpRight className="w-4 h-4 mb-10 text-primary" />
                    <h2 className="text-4xl tracking-tighter max-w-xl text-left font-regular flex flex-row gap-4 items-end">
                      $1052
                      <span className="text-muted-foreground text-sm tracking-normal">
                        +2%
                      </span>
                    </h2>
                    <p className="text-base leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
                      Cost per acquisition
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-3 dark:bg-transparent md:py-3 lg:py-1"
      >
        <div className="w-full py-10 lg:py-10">
          <div className="container mx-auto">
            <div className="flex flex-col gap-10">
              <div className="flex gap-4 flex-col items-start">
                <div>
                  <Badge>Platform</Badge>
                </div>
                <div className="flex gap-2 flex-col">
                  <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
                    Something new!
                  </h2>
                  <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground  text-left">
                    Managing a small business today is already tough.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid  lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <div className="bg-muted h-full w-full rounded-md aspect-square p-6 flex justify-between flex-col lg:col-span-2 lg:row-span-2">
                  {/* <User className="w-8 h-8 stroke-1" /> */}
                  {/* <div className="flex flex-col">
                    <h3 className="text-xl tracking-tight">
                      Pay supplier invoices test
                    </h3>
                    <p className="text-muted-foreground max-w-xs text-base">
                      Our goal is to streamline SMB trade, making it easier and
                      faster than ever.
                    </p>
                  </div> */}
                  <OrganizationTypePieChartComponent/>
                </div>

                <div className="bg-muted h-full rounded-md aspect-square p-6 flex justify-between flex-col">
                  {/* <User className="w-8 h-8 stroke-1" /> */}
                  {/* <div className="flex flex-col"> */}
                    <PublishedYearsBarChartComponent/>
                    {/* <h3 className="text-xl tracking-tight">
                      Pay supplier invoices test
                    </h3>
                    <p className="text-muted-foreground max-w-xs text-base">
                      Our goal is to streamline SMB trade, making it easier and
                      faster than ever.
                    </p> */}
                  {/* </div> */}
                </div>

                {/* <div className="bg-muted h-full rounded-md aspect-square p-6 flex justify-between flex-col">
                  <User className="w-8 h-8 stroke-1" />
                  <div className="flex flex-col">
                    <h3 className="text-xl tracking-tight">
                      Pay supplier invoices
                    </h3>
                    <p className="text-muted-foreground max-w-xs text-base">
                      Our goal is to streamline SMB trade, making it easier and
                      faster than ever.
                    </p>
                  </div>
                </div> */}

                {/* <div className="bg-muted h-full rounded-md aspect-square p-6 flex justify-between flex-col">
                  <User className="w-8 h-8 stroke-1" />
                  <div className="flex flex-col">
                    <h3 className="text-xl tracking-tight">
                      Pay supplier invoices
                    </h3>
                    <p className="text-muted-foreground max-w-xs text-base">
                      Our goal is to streamline SMB trade, making it easier and
                      faster than ever.
                    </p>
                  </div>
                </div> */}

                {/* <div className="bg-muted h-full rounded-md aspect-square p-6 flex justify-between flex-col">
                  <User className="w-8 h-8 stroke-1" />
                  <div className="flex flex-col">
                    <h3 className="text-xl tracking-tight">
                      Pay supplier invoices
                    </h3>
                    <p className="text-muted-foreground max-w-xs text-base">
                      Our goal is to streamline SMB trade, making it easier and
                      faster than ever.
                    </p>
                  </div>
                </div> */}

                {/* <div className="bg-muted h-full rounded-md aspect-square p-6 flex justify-between flex-col">
                  <User className="w-8 h-8 stroke-1" />
                  <div className="flex flex-col">
                    <h3 className="text-xl tracking-tight">
                      Pay supplier invoices
                    </h3>
                    <p className="text-muted-foreground max-w-xs text-base">
                      Our goal is to streamline SMB trade, making it easier and
                      faster than ever.
                    </p>
                  </div>
                </div> */}

                {/* <div className="bg-muted h-full rounded-md aspect-square p-6 flex justify-between flex-col">
                  <User className="w-8 h-8 stroke-1" />
                  <div className="flex flex-col">
                    <h3 className="text-xl tracking-tight">
                      Pay supplier invoices
                    </h3>
                    <p className="text-muted-foreground max-w-xs text-base">
                      Our goal is to streamline SMB trade, making it easier and
                      faster than ever.
                    </p>
                  </div>
                </div> */}

                {/* <div className="bg-muted h-full rounded-md p-6 flex justify-between flex-col lg:col-span-2">
                  <User className="w-8 h-8 stroke-1" />
                  <div className="flex flex-col">
                    <h3 className="text-xl tracking-tight">
                      Pay supplier invoices
                    </h3>
                    <p className="text-muted-foreground max-w-xs text-base">
                      Our goal is to streamline SMB trade, making it easier and
                      faster than ever.
                    </p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
