"use client";
import React, { useState } from "react";

import { useParams, useRouter } from "next/navigation";
import { useGetIndividualDoctors } from "@/api/doctors/use-get-individual-doctors";
import { useThrottle } from "@uidotdev/usehooks";
import DoctorDataComponent from "./components/DoctorDataComponent";

import DoctorAppointmentCard from "./components/DoctorAppointmentCard";
import { useGetAppointmentsByDoctorDate } from "@/api/appointments/use-get-appointments-by-doctor-date";
import { format, parse } from "date-fns";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ErrorState, LoadingState, NoDataState } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { usePostNewAppointment } from "@/api/appointments/use-post-new-appointment";
import { useToast } from "@/hooks/use-toast";
import {
  Calendar as CalendarIcon,
  User2Icon,
  User as UserIcon,
} from "lucide-react";

// Use your preferred icon library

type TimeRange = "morning" | "afternoon" | "evening";

const DoctorProfile = () => {
  const params = useParams();
  const { toast } = useToast();
  const router = useRouter();
  // states

  const [patientNameInput, setPatientNameInput] = useState("");
  const [date, setDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));

  
    const [payload, setPayload] = useState<AppointmentPayload>({
      doctorId: "",
      appointmentDate: "",
      appointStartTime: "",
      patientName: "",
      appointmentFor: "",
      phoneNumber: "",
      tenantId: "spandana",
    });
  const [appointmentFor, setAppointmentFor] = useState<string>("SELF");

  // queries and Mutation
  const { data, isLoading, isError, error } = useGetIndividualDoctors({
    variables: {
      id: params.id as string,
      tenantId: "spandana",
    },
  });
  const {
    data: appointmentData,
    isLoading: appointmentLoading,
    isError: appointmentIsError,
  } = useGetAppointmentsByDoctorDate({
    variables: {
      doctorId: params.id as string,
      date: date,
      tenantId: "spandana",
    },
  });

  const { mutate: bookAppointment, isPending } = usePostNewAppointment();

  

  const [timeRange, setTimeRange] = useState<TimeRange>(() => {
    const now = new Date();
    const isToday = format(date, "yyyy-MM-dd") === format(now, "yyyy-MM-dd");

    if (!isToday) return "morning";

    const currentHour = now.getHours();
    if (currentHour < 12) return "morning";
    if (currentHour < 17) return "afternoon";
    return "evening";
  });
  const IndividualDoctorData = data?.data[0];

  const getAvailableTimeRanges = (): TimeRange[] => {
    const now = new Date();
    const isToday =
      date && format(date, "yyyy-MM-dd") === format(now, "yyyy-MM-dd");

    if (!isToday) return ["morning", "afternoon", "evening"];

    if (now.getHours() < 12) return ["morning", "afternoon", "evening"];
    if (now.getHours() < 17) return ["afternoon", "evening"];
    return ["evening"];
  };

  const filterSlotsByTimeRange = (slots: TimeSlot[]) => {
    const now = new Date();
    const isToday =
      date && format(date, "yyyy-MM-dd") === format(now, "yyyy-MM-dd");

    return slots.filter((slot) => {
      const slotTime = parse(slot.startTime, "HH:mm", new Date());

      const isMorning = slotTime.getHours() < 12;
      const isAfternoon = slotTime.getHours() >= 12 && slotTime.getHours() < 17;
      const isEvening = slotTime.getHours() >= 17;

      if (isToday) {
        if (timeRange === "morning" && now.getHours() >= 12) {
          // Filter out slots that are in the past, but only if today
          return slotTime.getHours() < 12; // Keep only morning slots
        }
        if (timeRange === "afternoon" && now.getHours() >= 17) {
          // Filter out slots that are in the past, but only if today
          return slotTime.getHours() >= 12 && slotTime.getHours() < 17; // Keep only afternoon slots
        }
        if (timeRange === "evening") {
          return slotTime.getHours() >= 17; // Keep only evening slots
        }
      }

      // For other days or default, filter by timeRange normally
      switch (timeRange) {
        case "morning":
          return isMorning;
        case "afternoon":
          return isAfternoon;
        case "evening":
          return isEvening;
        default:
          return true;
      }
    });
  };

  const useSlotData = appointmentData?.data[0]?.appointmentTimeSlots.map(
    (slot) => ({
      ...slot,
      disabled: slot.appointmentStatus === "NOTAVAILABLE" ? true : false,
      appointmentDate: appointmentData?.data[0]?.appointmentDate,
    })
  );

  const filteredSlots = filterSlotsByTimeRange(useSlotData || []);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const validatePhoneNumber = (number: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!number) {
      setPhoneError("Phone number is required");
      return false;
    }
    if (!phoneRegex.test(number)) {
      setPhoneError("Please enter a valid 10-digit phone number");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const handleBookAppointment = () => {
    if (!validatePhoneNumber(phoneNumber)) {
      return;
    }

    if (!patientNameInput || !phoneNumber) {
      toast({
        title: "Please enter patient name and phone number",
        description: "Please enter patient name and phone number",
      });
      return;
    }

    // Create the appointment payload
    const appointmentPayload = {
      doctorId: params.id as string,
      appointmentDate: date,
      appointStartTime: payload.appointStartTime,
      patientName: patientNameInput,
      appointmentFor: appointmentFor,
      phoneNumber: phoneNumber,
      tenantId: "spandana",
    };

    console.log('Appointment Payload:', appointmentPayload);

    // Make the API call
    bookAppointment(appointmentPayload, {
      onSuccess: (data) => {
        console.log(data.status);
        if (data.status === 201) {
          toast({
            title: "Appointment Booked Successfully",
            description: `Please check your email for the appointment details ${data?.message} in your message`,
          });
          router.push("/");
        }
      },
      onError: (error) => {
        console.log(error);
        toast({
          title: "Appointment Booking Failed",
          description: "Please try again later",
        });
      },
    });
  };

  // LOADING STATE
  // console.log(useSlotData);
  const dataLoading = useThrottle(isLoading, 1000);

  if (dataLoading)
    return (
      <div>
        <LoadingState
          title="Loading Doctor's Profile"
          message="Please wait while we fetch the doctor's information"
        />
      </div>
    );

  if (isError)
    return (
      <ErrorState
        title="Failed to Load Profile"
        message={
          error?.message || "Unable to load doctor's profile. Please try again."
        }
        onRetry={() => window.location.reload()}
      />
    );

  if (!IndividualDoctorData)
    return (
      <NoDataState
        title="Doctor Not Found"
        message="We couldn't find the doctor you're looking for. They might have been removed or relocated."
      />
    );

  return (
    <div className="bg-white ">
      {/* Banner Section */}

      <div className="max-w-5xl mx-auto px-5">
        <DoctorDataComponent data={IndividualDoctorData} />
      </div>
      <div className="max-w-5xl mx-auto px-5 flex flex-row justify-end gap-5">
        <div className="">
          <DoctorAppointmentCard setDate={setDate} />
        </div>
        <div className="w-52">
          <Select
            value={timeRange}
            onValueChange={(value) =>
              setTimeRange(value as "morning" | "afternoon" | "evening")
            }
          >
            <SelectTrigger className="w-full mb-2">
              <SelectValue placeholder="Select time range">
                <div className="capitalize">{timeRange.toString()}</div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {getAvailableTimeRanges().map((range) => (
                <SelectItem key={range} value={range}>
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {appointmentLoading ? (
        <div className="max-w-5xl mx-5 mb-5 lg:mx-auto">
          <div className="px-5 bg-violet-100 p-5 m-10 border border-violet-800 rounded-md">
            <LoadingState
              title="Loading Appointments"
              message="Please wait while we fetch the appointments"
            />
          </div>
        </div>
      ) : appointmentIsError ? (
        <div className="max-w-5xl mx-5 mb-5 lg:mx-auto">
          <div className="px-5 bg-violet-100 p-5 m-10 border border-violet-800 rounded-md">
            <ErrorState
              title="Failed to Load Appointments"
              message="Please try again later"
            />
          </div>
        </div>
      ) : (
        <>
          {filteredSlots && filteredSlots.length === 0 && (
            <div className="max-w-5xl mx-5 mb-5 lg:mx-auto">
              <div className="px-5 bg-violet-100  border border-violet-800 rounded-md">
                <h1 className="font-sans text-xl m-2">
                  {format(new Date(date), "dd MMMM yyyy")}
                </h1>

                <h1 className=" m-2 text-3xl font-sans capitalize">
                  Available Slots for {timeRange}
                </h1>
                <NoDataState
                  title="No slots "
                  message="No slots found for the selected part of the day "
                />
              </div>
            </div>
          )}
        </>
      )}

      {/* Slots component when the slots are not available */}

      {/* Slots component when the slots are available */}
      {filteredSlots && filteredSlots.length > 0 && (
        <div className="max-w-5xl mx-5 lg:mx-auto mb-5">
          <div className="px-5 bg-violet-100 p-5 mt-4 border border-violet-800 rounded-md">
            <h1 className="font-sans text-xl m-2">
              {format(new Date(date), "dd MMMM yyyy")}
            </h1>

            <h1 className=" m-2 text-3xl font-sans capitalize">
              Available Slots for {timeRange}
            </h1>
            <ScrollArea className="h-[200px]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredSlots.map((slot, index) => (
                  <div key={index}>
                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button
                          onClick={() => {
                            setPayload({
                              ...payload,
                              appointStartTime: slot.startTime,
                              appointmentDate: slot.appointmentDate,
                              appointmentFor: appointmentFor,
                              doctorId: params.id as string,
                            });
                          }}
                          disabled={slot.disabled}
                          className="w-full text-sm md:text-base"
                          variant="default"
                        >
                          <div className="flex flex-col items-center md:flex-row md:justify-between">
                            <span>
                              {format(parse(slot.startTime, "HH:mm", new Date()), "hh:mm a")}
                            </span>
                            {slot.disabled && (
                              <span className="text-red-700 text-xs md:text-sm">(N/A)</span>
                            )}
                          </div>
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent>
                        <div className="md:max-w-xl  mx-auto flex flex-col gap-4 w-full justify-center ">
                          <DrawerTitle>
                            <DrawerHeader>
                              Would you like to book an appointment?
                            </DrawerHeader>
                          </DrawerTitle>

                          <div className="space-y-2 px-2">
                            {/* Appointment Details Card */}
                            <div className="bg-violet-50 rounded-lg p-4 shadow-sm border-2 border-violet-500">
                              <div className="flex items-center gap-2 mb-3">
                                <CalendarIcon className="w-5 h-5 text-violet-600" />
                                <h3 className="font-medium">
                                  Appointment Details
                                </h3>
                              </div>
                              <div className="grid grid-cols-2 gap-3 text-sm mt-4">
                                <div>
                                  <p className="text-gray-500">Date</p>
                                  <p className="font-medium">
                                    {slot.appointmentDate}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-gray-500">Time</p>
                                  <p className="font-medium">
                                    {format(
                                      parse(
                                        slot.startTime,
                                        "HH:mm",
                                        new Date()
                                      ),
                                      "hh:mm a"
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Doctor Details Card */}
                            <div className="bg-violet-50 rounded-lg p-4 shadow-sm border-2 border-violet-500">
                              <div className="flex items-center gap-2 mb-3">
                                <User2Icon className="w-5 h-5 text-violet-600" />
                                <h3 className="font-medium">
                                  Doctor Information
                                </h3>
                              </div>
                              <div className="space-y-2 text-sm mt-4">
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Name</span>
                                  <span className="font-medium">{`${IndividualDoctorData?.firstName} ${IndividualDoctorData?.lastName}`}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">
                                    Specialty
                                  </span>
                                  <span className="font-medium">
                                    {IndividualDoctorData?.specialty}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">
                                    Experience
                                  </span>
                                  <span className="font-medium">
                                    {IndividualDoctorData?.experienceYears}{" "}
                                    years
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">
                                    Consultation Fee
                                  </span>
                                  <span className="font-medium">
                                    ₹
                                    {
                                      IndividualDoctorData?.chargesPerTimeInterval
                                    }{" "}
                                    /{" "}
                                    {
                                      IndividualDoctorData?.availableTimeInterval
                                    }{" "}
                                    mins
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Patient Information Form */}
                            <div className="bg-violet-50 rounded-lg p-4 shadow-sm border-2 border-violet-500">
                              <div className="flex items-center gap-2">
                                <UserIcon className="w-5 h-5 text-violet-600" />
                                <h3 className="font-medium">
                                  Patient Information
                                </h3>
                              </div>
                              <div className="space-y-3 mt-4">
                                <div>
                                  <Input
                                    value={patientNameInput}
                                    onChange={(e) =>
                                      setPatientNameInput(e.target.value)
                                    }
                                    placeholder="Patient Name"
                                    className="w-full bg-white"
                                  />
                                </div>
                                <div>
                                  <Input
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => {
                                      const value = e.target.value.replace(
                                        /\D/g,
                                        ""
                                      );
                                      if (value.length <= 10) {
                                        setPhoneNumber(value);
                                        validatePhoneNumber(value);
                                      }
                                    }}
                                    placeholder="Phone Number"
                                    className={`w-full bg-white ${
                                      phoneError ? "border-red-500" : ""
                                    }`}
                                  />
                                  {phoneError && (
                                    <p className="text-xs text-red-500 mt-1">
                                      {phoneError}
                                    </p>
                                  )}
                                </div>
                                <Select
                                  onValueChange={(value) =>
                                    setAppointmentFor(value)
                                  }
                                >
                                  <SelectTrigger className="w-full bg-white">
                                    <SelectValue placeholder="Appointment For" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectItem value="SELF">Self</SelectItem>
                                      <SelectItem value="FAMILY">
                                        Family
                                      </SelectItem>
                                      <SelectItem value="OTHERS">
                                        Others
                                      </SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                          <DrawerFooter className="pb-8">
                            <Button
                              onClick={handleBookAppointment}
                              disabled={isPending}
                              className="w-full"
                              type="submit"
                              variant="default"
                            >
                              Book Appointment
                            </Button>
                            <DrawerClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                          </DrawerFooter>
                        </div>
                      </DrawerContent>
                    </Drawer>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorProfile;
