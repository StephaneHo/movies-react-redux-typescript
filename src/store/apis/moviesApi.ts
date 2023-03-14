import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY, BASE_URL } from "../../utils/constants";

interface Movies {
  page: string;
  result: string;
}

const moviesApi = createApi({
  reducerPath: "movies",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints(builder) {
    return {
      fetchMovies: builder.query<any, any>({
        query: (arg) => {
          return {
            url: "discover/movie",
            params: {
              api_key: API_KEY,
            },
            method: "GET",
          };
        },
      }),
      searchMovieByTitle: builder.query<any, any>({
        query: (arg) => {
          return {
            url: "/search/movie",
            params: {
              api_key: API_KEY,
              query: arg,
            },
            method: "GET",
          };
        },
      }),
      getMovieDetails: builder.query<any, any>({
        query: (arg) => {
          return {
            url: `/movie/${arg}`,
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
  useFetchMoviesQuery,
  useSearchMovieByTitleQuery,
  useGetMovieDetailsQuery,
} = moviesApi;
export { moviesApi };
