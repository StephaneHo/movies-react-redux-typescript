import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import Skeleton from "../components/Skeleton";
import { SearchBar } from "../components/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Typography } from "@mui/material";
import {
  useFetchTvseriesQuery,
  useSearchTvserieByTitleQuery,
} from "../store/apis/tvseriesApi";
import { searchTvserie } from "../store/apis/tvserieSlice";
import { IMAGE_BASE_URL } from "../utils/constants";

export const Tvseries = () => {
  const [wordEntered, setWordEntered] = useState<string>("");
  const dispatch = useDispatch();
  const { tvserieSearch } = useSelector((state: any) => state?.tvserie);

  const inputRef: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  window.addEventListener("load", () => inputRef.current?.focus());

  const handleFilter = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const searchWord: string = target.value.toLowerCase();
    setWordEntered(searchWord);
    dispatch(searchTvserie(searchWord));
  };

  const clearInput = (): void => {
    setWordEntered("");
    inputRef.current?.focus();
    dispatch(searchTvserie(""));
  };

  const {
    data: searchTvserieResults,
    isError: tvserieSearchError,
    isLoading: tvserieSearchLoading,
  } = useSearchTvserieByTitleQuery(tvserieSearch) || {};
  const { data, isError, isLoading } = useFetchTvseriesQuery(1) || {};
  let content;
  if (isLoading) {
    content = <Skeleton />;
  } else if (isError) {
    content = <div>Error loading albums.</div>;
  } else {
    content =
      tvserieSearch === ""
        ? data.results.map((movie: any) => {
            return <div>{movie.title}</div>;
          })
        : searchTvserieResults.results.length > 1 &&
          searchTvserieResults.results.map((tvserie: any) => {
            const image = IMAGE_BASE_URL + tvserie.backdrop_path;
            const id = tvserie.id;
            return (
              <Link to={`/tvseries/${id}`}>
                <ImageListItem key={tvserie.id}>
                  <img
                    src={`${image}?w=100&fit=crop&auto=format`}
                    srcSet={`${image}?w=100&fit=crop&auto=format&dpr=2 2x`}
                    alt={tvserie.name}
                    loading="lazy"
                  />
                  <ImageListItemBar title={tvserie.name} position="below" />
                </ImageListItem>
              </Link>
            );
          });
  }

  return (
    <>
      <Typography variant="h1" gutterBottom>
        TV Series
      </Typography>
      <SearchBar
        handleFilter={handleFilter}
        clearInput={clearInput}
        wordEntered={wordEntered}
        inputRef={inputRef}
      />
      <ImageList sx={{ width: 1000, height: 1050 }}>{content}</ImageList>
    </>
  );
};
