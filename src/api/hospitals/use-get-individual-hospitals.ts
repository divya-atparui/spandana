import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';
import { getHospitalById } from './hospitals';


type Response = HospitalsResponse;
type Variables = {
  id: string;
  tenantId: string;
};

export const useGetIndividualHospitals = createQuery<Response, Variables, AxiosError>({
  queryKey: ['hospital'],
  fetcher: ({ id }) => getHospitalById(id),
});
