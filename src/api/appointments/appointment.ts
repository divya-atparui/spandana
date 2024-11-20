"use server";

import axios from "axios";
import { client } from "../common";

export const getAppointmentsByDoctorDate = async (
  doctorId: string,
  date: string,
  tenantId: string
) => {
  try {
    const response = await client.get(
      `/api/appointment/getAppointments-byDoctor-date/${doctorId}/${date}`,
      {
        headers: {
          "X-PrivateTenant": tenantId,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "An error occurred");
    } else {
      throw new Error("Unexpected error");
    }
  }
};

export const postNewAppointment = async (payload: AppointmentPayload) => {
  try {
    const response = await client.post(
      "/api/appointment/new-appointment",
      payload,
      {
        headers: {
          "X-PrivateTenant": payload.tenantId,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "An error occurred");
    } else {
      throw new Error("Unexpected error");
    }
  }
};
