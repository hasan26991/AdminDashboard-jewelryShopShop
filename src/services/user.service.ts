import { baseApi } from "./base.service";
import { parseResponse } from "../utils/apiHelpers";
import ApiUrls from "../utils/apiUrls";

export const userApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getTodos: builder.query<any[], void>({
      queryFn: async (_args, _api, _extraOptions, baseQuery) => {
        const query = await baseQuery({
          url: ApiUrls.Todo.todo,
        });
        const response = parseResponse<any[]>(query);
        return response;
      },
    }),
  }),
});

export const { useGetTodosQuery } = userApi;
