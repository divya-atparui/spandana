import type { AxiosError } from "axios";
import { createQuery } from "react-query-kit";

import { getAllDoctors } from "./doctors";

type Response = DoctorsResponse;
type Variables = {
  tenantId: string;
};

export const useGetAllDoctors = createQuery<Response, Variables, AxiosError>({
  queryKey: ["doctors"],
  fetcher: async ({ tenantId }) => {
    const data = await getAllDoctors(tenantId);
    return data;
  },
});
