import type { AxiosError } from 'axios';
import axios from 'axios';
import { createMutation } from 'react-query-kit';


// Example Axios Request for Create Customer
// axios.post('<https://affwa.atparui.com/rest/services/createcustomer>', {
//   emailProductStoreId: "9000",
//   USER_TITLE: "Mr.",
//   USER_FIRST_NAME: "Sivakumar",
//   USER_MIDDLE_NAME: "test",
//   USER_LAST_NAME: "Nair",
//   USER_SUFFIX: "",
//   CUSTOMER_EMAIL: "shivain43@gmail.com",
//   CUSTOMER_EMAIL_ALLOW_SOL: "",
//   CUSTOMER_ADDRESS1: "16, Meenakshi Residency, Sanjay Nagar",
//   CUSTOMER_ADDRESS2: "",
//   CUSTOMER_CITY: "Bengaluru",
//   CUSTOMER_POSTAL_CODE: "560096",
//   CUSTOMER_COUNTRY: "IND",
//   CUSTOMER_STATE: "IN-AN",
//   CUSTOMER_ADDRESS_ALLOW_SOL: "",
//   CUSTOMER_HOME_COUNTRY: "",
//   CUSTOMER_HOME_AREA: "",
//   CUSTOMER_HOME_CONTACT: "9971268018",
//   CUSTOMER_HOME_EXT: "",
//   CUSTOMER_HOME_ALLOW_SOL: "",
//   CUSTOMER_WORK_COUNTRY: "",
//   CUSTOMER_WORK_AREA: "",
//   CUSTOMER_WORK_CONTACT: "",
//   CUSTOMER_WORK_EXT: "",
//   CUSTOMER_WORK_ALLOW_SOL: "",
//   CUSTOMER_FAX_COUNTRY: "",
//   CUSTOMER_FAX_AREA: "",
//   CUSTOMER_FAX_CONTACT: "",
//   CUSTOMER_FAX_ALLOW_SOL: "",
//   CUSTOMER_MOBILE_COUNTRY: "",
//   CUSTOMER_MOBILE_AREA: "",
//   CUSTOMER_MOBILE_CONTACT: "",
//   CUSTOMER_MOBILE_ALLOW_SOL: "",
//   UNUSEEMAIL: "on",
//   USERNAME: "shivain43@gmail.com",
//   PASSWORD: "shiva",
//   CONFIRM_PASSWORD: "shiva",
//   PASSWORD_HINT: ""
// })

type Variables = {
  emailProductStoreId: string;
  USER_TITLE: string;
  USER_FIRST_NAME: string;
  USER_MIDDLE_NAME: string;
  USER_LAST_NAME: string;
 
  CUSTOMER_EMAIL: string;

  CUSTOMER_ADDRESS1: string;
  CUSTOMER_ADDRESS2: string;
  CUSTOMER_CITY: string;
  CUSTOMER_POSTAL_CODE: string;
  CUSTOMER_COUNTRY: string;
  CUSTOMER_STATE: string;

  CUSTOMER_HOME_CONTACT: string;
  CUSTOMER_MOBILE_CONTACT: string;

  UNUSEEMAIL: 'on' | 'off';
  USERNAME: string;
  PASSWORD: string;
  CONFIRM_PASSWORD: string;
};
type Response = {};



export const usePostNewUser = createMutation<Response, Variables, AxiosError>({
    mutationFn: async (variables) => {
      try {
        const response = await axios.post(
          "https://affwa.atparui.com/rest/services/createcustomer",
          variables,
          {
            headers: {
              "Content-Type": "application/json",
              "X-PrivateTenant": "affwa",
            },
          }
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
  
