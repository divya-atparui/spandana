import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { getIndividualDoctors } from './doctors';

type Response = DoctorsResponse;
type Variables = {
  id: string;
  tenantId: string;
};

export const useGetIndividualDoctors = createQuery<Response, Variables, AxiosError>({
  queryKey: ['get-individual-doctors'],
  fetcher: ({id, tenantId}) => {
    const data = getIndividualDoctors(id, tenantId)
    return data
  },
});
