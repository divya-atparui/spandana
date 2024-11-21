// import { useGetAppointmentsByDoctorDate } from "@/api/appointments";
import React, { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format, isBefore, startOfToday } from "date-fns";
import { CalendarIcon } from "lucide-react";

const DoctorAppointmentCard = ({
  setDate,
}: {
  setDate: (date: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );

  //   const { data, isError, error, isLoading } = useGetAppointmentsByDoctorDate({
  //     variables: {
  //       doctorId: doctorData?.id || 0,
  //       date: formattedDate,
  //       tenantId: "spandana",
  //     },
  //   });
  return (
    <div>
      <div className=" ">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button className="drop-shadow-lg " variant="default">
              <div className="flex flex-row items-center gap-2">
                <CalendarIcon width={40} height={40} />
                <p className="text-sm md:text-base font-bold">Select Date</p>
              </div>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="flex flex-col gap-4 max-w-sm mx-auto">
              <DrawerHeader>
                <DrawerTitle>Select Date</DrawerTitle>
                <DrawerDescription>
                  Please select the date that you want to check for an
                  appointment.
                </DrawerDescription>
              </DrawerHeader>
              <div className="max-w-sm mx-auto">
                <Calendar
                  mode="single"
                  selected={new Date(selectedDate)}
                  onSelect={(date: Date | undefined) => {
                    if (date) {
                      setSelectedDate(format(date, "yyyy-MM-dd"));
                      setDate(format(date, "yyyy-MM-dd"));
                    }
                  }}
                  disabled={(date) => isBefore(date, startOfToday())}
                  // date && setSelectedDate(format(date, "yyyy-MM-dd")) && setDate(format(date, "yyyy-MM-dd"))

                  className="rounded-md border"
                />
              </div>
              <DrawerFooter>
                <Button
                  type="submit"
                  onClick={() => {
                    const formattedDate = format(selectedDate, "yyyy-MM-dd");

                    setDate(formattedDate);
                    setOpen(false);
                  }}
                >
                  Submit
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default DoctorAppointmentCard;
