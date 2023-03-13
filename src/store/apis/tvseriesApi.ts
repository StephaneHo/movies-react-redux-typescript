import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY, BASE_URL } from "../../utils/constants";

interface Tvseries {
  page: string;
  result: string;
}

const tvseriesApi = createApi({
  reducerPath: "tvseries",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints(builder) {
    return {
      fetchTvseries: builder.query<any, any>({
        query: (arg) => {
          return {
            url: "discover/tv",
            params: {
              api_key: API_KEY,
            },
            method: "GET",
          };
        },
      }),
      searchTvserieByTitle: builder.query<any, any>({
        query: (arg) => {
          const { searchText } = arg;
          console.log("API searchText", arg);
          return {
            url: "/search/tv",
            params: {
              api_key: API_KEY,
              query: arg,
            },
            method: "GET",
          };
        },
      }),
      getTvserieDetails: builder.query<any, any>({
        query: (arg) => {
          const { searchText } = arg;
          console.log("API searchText", arg);
          return {
            url: `/tv/${arg}`,
            params: {
              api_key: API_KEY,
            },
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useFetchTvseriesQuery,
  useSearchTvserieByTitleQuery,
  useGetTvserieDetailsQuery,
} = tvseriesApi;
export { tvseriesApi };
