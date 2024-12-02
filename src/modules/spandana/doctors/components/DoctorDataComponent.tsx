import { User2Icon } from "lucide-react";
import React, { useState } from "react";

function DoctorDataComponent({ data }: { data: Doctor }) {
  const doctorData = {
    name: data.firstName + " " + data.lastName,
    title: data.qualification,
    about: `Dr. ${data.firstName} is a ${data.qualification} with over ${data.experienceYears} years of experience in the field of ${data.specialty}.`,
    address: data.address,
    phone: data.contactNumber,
    baseImgUrl: data.baseImgUrl,
    email: data.email,
    qualification: data.qualification,
    specialty: data.specialty,
    experienceYears: data.experienceYears,
  };

  const [imageError, setImageError] = useState(false);

  return (
    <div>
      <div className="bg-white py-4">
        <div className="flex flex-col sm:flex-row items-center  md:items-end gap-8 mb-1">
          <div className="hidden md:w-1/4 lg:w-1/4 sm:flex sm:justify-center sm:flex-col sm:items-center">
            <div className="">
              {imageError ? (
                <div className="w-24 sm:w-48 h-30 sm:h-56 flex items-center justify-center bg-gray-200 rounded-lg shadow-lg">
                  <User2Icon size={80} />
                </div>
              ) : (
                <img
                  className="rounded-lg shadow-lg  drop-shadow-sm shadow-neutral-500"
                  src={doctorData.baseImgUrl}
                  alt=""
                  onError={() => setImageError(true)}
                />
              )}
            </div>
          </div>

          <div className="w-full md:w-2/3 ">
            <div>
              <div className="flex flex-col justify-center sm:justify-between items-center min-[350px]:flex-row flex-wrap ">
                <h1 className="text-3xl font-bold mb-2 mt-4 hidden sm:flex">
                  {doctorData.name}
                </h1>

                {imageError ? (
                  <div className="w-[250px] h-[250px] sm:hidden flex items-center justify-center bg-gray-200 rounded-lg shadow-lg">
                    <User2Icon size={80} />
                  </div>
                ) : (
                  <img
                    className="rounded-lg shadow-lg  h-[280px] sm:hidden w-48"
                    src={doctorData.baseImgUrl}
                    alt=""
                    onError={() => setImageError(true)}
                  />
                )}
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2 mt-4 sm:hidden flex">
              {doctorData.name}
            </h1>

            <h2 className="text-xl text-gray-600 mb-1 uppercase">
              {doctorData.specialty}
            </h2>
            <p className="text-gray-700 mb-2">{doctorData.qualification}</p>
            <p>
              Dr. {doctorData.name} is with us for {doctorData.experienceYears}{" "}
              years and the specialities they have is in {doctorData.specialty}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDataComponent;
