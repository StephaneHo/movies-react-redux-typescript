import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY, BASE_URL } from "../../utils/constants";

export interface MoviesType {
  results: MovieResultType[];
}

export interface MovieDetailsType {
  title: string;
  tagline: string;
  backdrop_path: string;
  overview: string;
}

export interface SearchMovieType {
  results: MovieResultType[];
}

export interface MovieResultType {
  id: string;
  backdrop_path: string;
  title: string;
}

const moviesApi = createApi({
  reducerPath: "movies",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints(builder) {
    return {
      fetchMovies: builder.query<MoviesType, void>({
        query: () => {
          return {
            url: "discover/movie",
            params: {
              api_key: API_KEY,
            },
            method: "GET",
          };
        },
      }),
      searchMovieByTitle: builder.query<SearchMovieType, string>({
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
      getMovieDetails: builder.query<MovieDetailsType, string>({
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
