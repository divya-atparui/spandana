// src/api/appointments/use-get-appointment-slots.ts

import type { AxiosError } from "axios";
import { createQuery } from "react-query-kit";
import { getAppointmentsByDoctorDate } from "./appointment";

type Response = AppointmentSlotsResponse;
type Variables = { doctorId: string; date: string; tenantId: string };

export const useGetAppointmentsByDoctorDate = createQuery<
  Response,
  Variables,
  AxiosError
>({
  queryKey: ["appointmentSlots"],
  fetcher: ({ doctorId, date, tenantId }) => {
    const data = getAppointmentsByDoctorDate(doctorId, date, tenantId);
    return data;
  },
});
