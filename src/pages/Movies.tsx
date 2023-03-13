import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import { useFetchMoviesQuery } from "./../app/store";
import Skeleton from "../components/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { searchMovie } from "./../store/apis/movieSlice";
import { useSearchMovieByTitleQuery } from "../store/apis/moviesApi";
import ImageList from "@mui/material/ImageList";
import { SearchBar } from "../components/SearchBar";
import { Title } from "../components/Title";
import { Item } from "../components/Item";
import { ErrorMessage } from "../components/ErrorMessage";

export const Movies = () => {
  const [wordEntered, setWordEntered] = useState<string>("");
  const dispatch = useDispatch();
  const { movieSearch } = useSelector((state: any) => state?.movie);

  const inputRef: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  window.addEventListener("load", () => inputRef.current?.focus());

  const handleFilter = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const searchWord: string = target.value.toLowerCase();
    setWordEntered(searchWord);
    dispatch(searchMovie(searchWord));
  };

  const clearInput = (): void => {
    setWordEntered("");
    inputRef.current?.focus();
    dispatch(searchMovie(""));
  };

  const {
    data: searchMovieResults,
    isError: isMovieSearchError,
    isLoading: isMovieSearchLoading,
  } = useSearchMovieByTitleQuery(movieSearch) || {};
  const { data, isError, isLoading } = useFetchMoviesQuery(1) || {};
  let content;
  if (isLoading || isMovieSearchLoading) {
    content = <Skeleton />;
  } else if (isError || isMovieSearchError) {
    content = <ErrorMessage message="error loading the movies" />;
  } else {
    let results =
      movieSearch === "" ? data.results : searchMovieResults.results;

    content = results.map((movie: any) => {
      const id = movie.id;
      return (
        <Link to={`/${id}`}>
          <Item id={id} imagePath={movie.backdrop_path} title={movie.title} />
        </Link>
      );
    });
  }

  return (
    <>
      <Title text="Movies" />
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
