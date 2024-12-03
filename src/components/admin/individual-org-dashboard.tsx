"use client";

import {

  IconClock,
  IconPhone,
  IconWorld,
} from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams, useSearchParams } from "next/navigation";
import { useGetIndividualHospitals } from "@/api/hospitals/use-get-individual-hospitals";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function IndividualOrgDashboard() {
  const params = useParams();
  const searchParams = useSearchParams();

  const tenantId = params.tenantId as string;
  const hospitalId = searchParams.get("hospitalId");

  const { data, isLoading, isError } = useGetIndividualHospitals({
    variables: {
      id: hospitalId as string,
      tenantId: tenantId,
    },
  });

  const hospital = data?.data[0];

  console.log(hospital);

  const stats = [
    {
      name: "Pre-booking Min Time",
      value: hospital?.configurablePreBookingMinMinsBefore,
      suffix: "mins",
      icon: IconClock,
    },
    {
      name: "Pre-booking Max Time",
      value: hospital?.configurablePreBookingMaxMinsBefore,
      suffix: "mins",
      icon: IconClock,
    },
    {
      name: "Contact",
      value: hospital?.contactNumber,
      icon: IconPhone,
      className: "font-mono",
    },
    {
      name: "Domain",
      value: hospital?.domainUrl,
      icon: IconWorld,
      className: "break-all font-mono text-lg",
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="h-4 w-[300px] mt-2" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-[140px]" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-7 w-[100px]" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError || !hospital) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-semibold text-destructive">
          Error loading hospital data
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        {/* <Image
          src={hospital.iconImgUrl}
          alt={hospital.hospitalName}
          width={100}
          height={100}
          className="rounded-full"
        /> */}
        <h1 className="text-4xl font-bold tracking-tight capitalize">
          {hospital.hospitalName.toLowerCase()}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
          {hospital.hospitalAddress}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 ">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.name}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={cn("text-2xl font-bold", stat.className)}>
                  {stat.value || "N/A"}
                  {stat.suffix && (
                    <span className="text-lg font-normal text-muted-foreground ml-1">
                      {stat.suffix}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
