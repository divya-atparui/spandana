"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaStethoscope, FaBriefcaseMedical, FaUserMd } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { useGetAllDoctors } from "@/api";
import { Loader2 } from "lucide-react";
import Link from "next/link";



const AllDoctorsPage = () => {
  const { data, isLoading, isError } = useGetAllDoctors({
    variables: {
      tenantId: "spandana",
    },
  });
  console.log(data);

  const doctors = data?.data.map((doctor) => ({
    ...doctor,
    fullName: `${doctor.firstName} ${doctor.lastName}`,
  }));

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
        <p className="text-gray-600 font-medium">
          Loading doctors information...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="text-red-500 text-lg font-semibold">
          Unable to load doctors information
        </div>
        <p className="text-gray-600">
          Please try refreshing the page or contact support if the problem
          persists.
        </p>
        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          className="mt-2"
        >
          Try Again
        </Button>
      </div>
    );
  }
  // console.log(JSON.stringify(doctors));

  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="flex mb-8">
        <div className="flex flex-col gap-2 items-center justify-center w-full">
          <h1 className="text-3xl font-bold text-gray-900">Our Medical Team</h1>
          <p className="text-gray-500 mt-2">
            Meet our experienced healthcare professionals
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 items-center justify-center">
        {doctors?.map((doctor, index) => (
          <Card
            key={index}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <CardContent className="p-4">
              <div className=" flex  justify-center pb-4">
                <img
                  src={doctor.baseImgUrl}
                  alt={doctor.fullName}
                  className="object-contain h-32 w-32  rounded-full border-2 border-gray-300"
                />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <FaUserMd className="text-blue-500" />
                <h3 className="font-semibold text-lg">
                  {doctor.firstName} {doctor.lastName}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                <Badge
                  key={doctor.qualification}
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 hover:bg-blue-200"
                >
                  {doctor.qualification.trim()}
                </Badge>
                <Badge
                  key={doctor.specialty}
                  variant="secondary"
                  className="bg-green-100 text-green-800 hover:bg-blue-200"
                >
                  {doctor.specialty}
                </Badge>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <Link href={`/doctors/${doctor.id}`}>
                  <Button className="text-white bg-violet-600 hover:bg-violet-800 transition-colors flex items-center gap-2 text-sm">
                    <FaStethoscope />
                    View Profile
                  </Button>
                </Link>
                <Button className="text-white bg-green-500 hover:bg-green-700 flex items-center gap-2 text-sm">
                  <FaBriefcaseMedical />
                  Book Appointment
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllDoctorsPage;
