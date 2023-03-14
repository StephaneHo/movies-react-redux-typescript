import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY, BASE_URL } from "../../utils/constants";

export interface TvseriesType {
  results: TvserieResultType[];
}

export interface TvserieDetailsType {
  name: string;
  tagline: string;
  backdrop_path: string;
  overview: string;
}

export interface SearchTvserieType {
  results: TvserieResultType[];
}

export interface TvserieResultType {
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
      fetchTvseries: builder.query<TvseriesType, void>({
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
      searchTvserieByTitle: builder.query<SearchTvserieType, string>({
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
      getTvserieDetails: builder.query<TvserieDetailsType, string>({
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
