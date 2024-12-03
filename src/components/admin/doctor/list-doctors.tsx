"use client";

import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { ErrorComponent, LoadingComponent, NoDataComponent } from "@/components/shared/state-components";

import { useGetAllDoctors } from "@/api";
import { useParams } from "next/navigation";

export default function ListDoctors() {
  const params = useParams();
  const tenantId = params.tenantId;
  const { data, isLoading, isError } = useGetAllDoctors({
    variables: {
      tenantId: tenantId.toString(),
    },
  });

  const doctors = data?.data;

  console.log(doctors);

  if (isLoading) return <LoadingComponent message="Loading doctors..." />;
  if (isError) return <ErrorComponent message="Failed to load doctors" />;
  if (!data || doctors?.length === 0 || doctors === undefined || doctors === null)
    return <NoDataComponent message="No doctors found" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Doctors</h2>
          <p className="text-muted-foreground">
            Manage hospital doctors and their schedules
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <IconPlus className="w-4 h-4" />
          Add Doctor
        </Button>
      </div>

      <DataTable columns={columns} data={doctors} />
    </div>
  );
}
