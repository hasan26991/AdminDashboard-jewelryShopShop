import { Auth } from "aws-amplify";
import { baseApi } from "./base.service";
import { ILoginProps } from "../models/user.model";

// Define a service using a base URL and expected endpoints
export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    login: builder.mutation<any, ILoginProps>({
      queryFn: async (args) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        try {
          const user = await Auth.signIn(args.username, args.password);

          return { data: user.signInUserSession.accessToken.jwtToken };
        } catch (error) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return error as any;
        }
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation } = userApi;
