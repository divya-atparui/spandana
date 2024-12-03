import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { getAllHospitals } from './hospitals';

type Response = HospitalsResponse;
type Variables = void;

export const useGetAllHospitals = createQuery<Response, Variables, AxiosError>({
  queryKey: ['hospitals'],
  fetcher: () => {
    const data = getAllHospitals()
    return data
  },
});
