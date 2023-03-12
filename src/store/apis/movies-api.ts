import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Movies {
    page: string,
    result: string
}

const moviesApi = createApi({
    reducerPath: 'movies',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.themoviedb.org/3'
    }),
    endpoints(builder){
        return {
            fetchMovies: builder.query<any, any>({
                query: (arg) => {
                    return {
                        url: 'discover/movie',
                        params: {
                            api_key: "92b418e837b833be308bbfb1fb2aca1e" 
                        },
                        method: 'GET'  
                    };
                }
            }),
            searchMovieByTitle:  builder.query<any, any>({
                query: (arg) => {
                    const {searchText} = arg;
                    console.log("API searchText", arg);
                    return {
                        url: '/search/movie',
                        params: {
                            api_key: "92b418e837b833be308bbfb1fb2aca1e",
                            query: arg
                        },
                        method: 'GET'  
                    };
                }
            }),
        };
    }
     
});


export const {useFetchMoviesQuery, useSearchMovieByTitleQuery} = moviesApi;
export {moviesApi};