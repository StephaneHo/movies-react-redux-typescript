import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import Skeleton from "../components/Skeleton";
import { SearchBar } from "../components/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import ImageList from "@mui/material/ImageList";
import {
  TvserieResult,
  useFetchTvseriesQuery,
  useSearchTvserieByTitleQuery,
} from "../store/apis/tvseriesApi";
import { searchTvserie } from "../store/apis/tvserieSlice";
import { Title } from "../components/Title";
import { ErrorMessage } from "../components/ErrorMessage";
import { Item } from "../components/Item";
import { RootState } from "../app/store";

export const Tvseries = () => {
  const [wordEntered, setWordEntered] = useState<string>("");
  const dispatch = useDispatch();
  const { tvserieSearch } = useSelector((state: RootState) => state?.tvserie);

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
  const { data, isError, isLoading } = useFetchTvseriesQuery() || {};
  let content;
  if (isLoading || isTvserieSearchLoading) {
    content = <Skeleton />;
  } else if (isError || isTvserieSearchError) {
    content = <ErrorMessage message="error loading the tv series" />;
  } else {
    let results;
    if (tvserieSearch === "" && data !== undefined) {
      results = data.results;
    } else if (tvserieSearch !== "" && searchTvserieResults !== undefined) {
      results = searchTvserieResults.results;
    }

    if (results !== undefined) {
      content = results.map((tvserie: TvserieResult) => {
        const id = tvserie.id;
        return (
          <Link to={`/tvseries/${id}`} key={id}>
            <Item
              id={id}
              imagePath={tvserie.backdrop_path}
              title={tvserie.name}
              aria-label={tvserie.name}
            />
          </Link>
        );
      });
    } else {
      content = <></>;
    }
  }

  return (
    <>
      <Title text="TV Series" />
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
