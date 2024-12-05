import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { getSuperAdminToken } from './auth';
import { cookieLogin } from './cookie';

type Variables = SuperAdminLoginVariables;
type Response = SuperAdminLoginResponse;

export const useGetSuperAdminToken = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) => {
    const response : SuperAdminLoginResponse = await getSuperAdminToken(variables);
    cookieLogin({id_token:response.data[0].token})
    return response;
  },
});