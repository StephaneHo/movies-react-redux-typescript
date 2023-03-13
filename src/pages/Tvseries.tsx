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
import { Title } from "../components/Title";
import { ErrorMessage } from "../components/Error";
import { Item } from "../components/Item";

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
    isError: isTvserieSearchError,
    isLoading: isTvserieSearchLoading,
  } = useSearchTvserieByTitleQuery(tvserieSearch) || {};
  const { data, isError, isLoading } = useFetchTvseriesQuery(1) || {};
  let content;
  if (isLoading || isTvserieSearchLoading) {
    content = <Skeleton />;
  } else if (isError || isTvserieSearchError) {
    content = <ErrorMessage message="error loading the tv series" />;
  } else {
    let results =
      tvserieSearch === "" ? data.results : searchTvserieResults.results;

    content = results.map((tvserie: any) => {
      const id = tvserie.id;
      return (
        <Link to={`/tvseries/${id}`}>
          <Item
            id={id}
            imagePath={tvserie.backdrop_path}
            title={tvserie.name}
          />
        </Link>
      );
    });
  }

  return (
    <>
      <Title text="Tv series" />
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
