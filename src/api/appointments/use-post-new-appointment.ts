import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { postNewAppointment } from './appointment';

type Variables = AppointmentPayload;
type Response = AppointmentSuccessResponse;


export const usePostNewAppointment = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) => {
    const response = await postNewAppointment(variables);
    return response;
  },
});