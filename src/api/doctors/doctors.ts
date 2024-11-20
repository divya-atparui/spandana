"use server";

import axios from "axios";
import { client } from "../common";


export const getAllDoctors = async (tenantId: string) => {
  try {
    const data = client
      .get("/api/doctors/all-doctors", {
        headers: {
          "X-PrivateTenant": tenantId,
        },
      })
      .then((response) => response.data);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "An error occurred");
    } else {
      throw new Error("Unexpected error");
    }
  }
};

export const getIndividualDoctors = async (id: string, tenantId: string) => {
try {
  const data = client.get(`/api/doctors/byId/${id}`, {
    headers: {
      "X-PrivateTenant": tenantId,
      },
    })
      .then((response) => response.data);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "An error occurred");
    } else {
      throw new Error("Unexpected error");
    }
  }
};
