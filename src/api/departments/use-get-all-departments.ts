import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { getAllDepartments } from './departments';

type Response = DepartmentsResponse;
type Variables = undefined;


export const useGetAllDepartments = createQuery<Response, Variables, AxiosError>({
  queryKey: ['departments'],
  fetcher: async() => {
  const data = await getAllDepartments();
  return data;
  },
});
