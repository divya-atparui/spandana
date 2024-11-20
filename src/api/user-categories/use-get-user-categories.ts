import {AxiosError} from "axios";
import {  createQuery } from "react-query-kit";
import { getAllUserCategories } from "./user-categories";

type Response = UserCategoriesResponse

type Variables = {
  tenantId: string;
};

export const useGetUserCategories = createQuery<
  Response,
  Variables,
  AxiosError
>({
  queryKey: ["user-categories"],
  fetcher: async ({ tenantId }) => {
    
    const data = await getAllUserCategories(tenantId);
    return data;
  }})