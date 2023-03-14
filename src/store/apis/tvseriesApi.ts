import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY, BASE_URL } from "../../utils/constants";

interface Tvseries {
  results: TvserieResult[];
}

interface TvserieDetails {
  name: string;
  tagline: string;
  backdrop_path: string;
  overview: string;
}

interface SearchTvserie {
  results: TvserieResult[];
}

export interface TvserieResult {
  id: string;
  backdrop_path: string;
  name: string;
}

const tvseriesApi = createApi({
  reducerPath: "tvseries",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints(builder) {
    return {
      fetchTvseries: builder.query<Tvseries, void>({
        query: () => {
          return {
            url: "discover/tv",
            params: {
              api_key: API_KEY,
            },
            method: "GET",
          };
        },
      }),
      searchTvserieByTitle: builder.query<SearchTvserie, string>({
        query: (arg) => {
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
      getTvserieDetails: builder.query<TvserieDetails, string>({
        query: (arg) => {
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
