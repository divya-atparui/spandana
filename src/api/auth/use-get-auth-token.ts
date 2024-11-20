import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { type TokenResponse } from './types';
import { client } from '../common';

type Variables = {
  
  username: string;
  password: string;
  userCategoryId: number;

  
};

type Response = TokenResponse;

export const useGetAuthToken = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) => {
    const { username, password, userCategoryId } = variables;
    
    return client({
      url: '/auth/token',
      method: 'POST',
      data: {
        username,
        password,
        userCategoryId
      },
   
    }).then((response) => response.data);
  }
});