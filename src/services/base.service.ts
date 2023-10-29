import { createApi } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
// import dotenv from "dotenv";
// dotenv.config();

export enum RequestTags {
  Todos = "Todos",
}

const tagTypes = Object.values(RequestTags);

const baseQuery = fetchBaseQuery({
  baseUrl: `${"http://localhost:3005"}/`,
  credentials: "include",
});

export const baseApi = createApi({
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      if (action.payload) return action.payload[reducerPath];
    }
  },
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes,
});
