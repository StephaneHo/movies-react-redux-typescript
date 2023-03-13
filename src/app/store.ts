import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { moviesApi } from "../store/apis/moviesApi";
import movieSlice from "../store/apis/movieSlice";
import { tvseriesApi } from "../store/apis/tvseriesApi";
import tvserieSlice from "../store/apis/tvserieSlice";

export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
    movie: movieSlice,
    [tvseriesApi.reducerPath]: tvseriesApi.reducer,
    tvserie: tvserieSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(moviesApi.middleware)
      .concat(tvseriesApi.middleware);
  },
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export { useFetchMoviesQuery } from "../store/apis/moviesApi";
