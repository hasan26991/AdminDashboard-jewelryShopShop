import { baseApi } from "./base.service";
import { parseResponse } from "../utils/apiHelpers";
import ApiUrls from "../utils/apiUrls";

export const testApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getTodos: builder.query<any[], void>({
      queryFn: async (_args, _api, _extraOptions, baseQuery) => {
        const query = await baseQuery({
          url: ApiUrls.Todo.todo,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = parseResponse<any[]>(query);
        return response;
      },
    }),
  }),
});

export const { useGetTodosQuery } = testApi;
