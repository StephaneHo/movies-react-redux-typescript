import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export interface TvserieSearch {
  tvserieSearch: string;
}

const initialState = {
  tvserieSearch: "",
};

export const tvserieSlice = createSlice({
  name: "tvserie",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    searchTvserie: (state, action) => {
      // the movie title we are trying to search
      console.log("searchMovie payload", action.payload);
      state.tvserieSearch = action.payload;
    },
    clearSearchTvserie: (state) => {
      state.tvserieSearch = "";
    },
  },
});

export default tvserieSlice.reducer;
export const { searchTvserie, clearSearchTvserie } = tvserieSlice.actions;
