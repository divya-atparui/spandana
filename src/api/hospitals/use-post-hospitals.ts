import type { AxiosError } from "axios";
import { createMutation } from "react-query-kit";
import { createHospital } from "./hospitals";

type Response = HospitalResponse;

export const usePostHospitals = createMutation<Response, FormData, AxiosError>(
  {
    mutationFn: async (formData) => {
      const data = await createHospital(formData);
      return data;
    },
  }
);
