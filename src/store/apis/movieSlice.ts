import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieSearch: "",
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    searchMovie: (state, action) => {
      // the movie title we are trying to search
      state.movieSearch = action.payload;
    },
    clearSearchMovie: (state) => {
      state.movieSearch = "";
    },
  },
});

export default movieSlice.reducer;
export const { searchMovie, clearSearchMovie } = movieSlice.actions;
