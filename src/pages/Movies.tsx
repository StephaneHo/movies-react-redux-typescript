import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import { useFetchMoviesQuery } from "./../app/store";
import Skeleton from "./../components/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { searchMovie } from "./../store/apis/movieSlice";
import { useSearchMovieByTitleQuery } from "../store/apis/moviesApi";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Typography } from "@mui/material";
import { SearchBar } from "../components/SearchBar";

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
    isError: movieSearchError,
    isLoading: movieSearchLoading,
  } = useSearchMovieByTitleQuery(movieSearch) || {};
  const { data, isError, isLoading } = useFetchMoviesQuery(1) || {};
  let content;
  if (isLoading) {
    content = <Skeleton />;
  } else if (isError) {
    content = <div>Error loading albums.</div>;
  } else {
    content =
      movieSearch === ""
        ? data.results.map((movie: any) => {
            return <div>{movie.title}</div>;
          })
        : searchMovieResults.results.length > 1 &&
          searchMovieResults.results.map((movie: any) => {
            const image =
              "https://image.tmdb.org/t/p/original/" + movie.backdrop_path;
            const id = movie.id;
            return (
              <Link to={`/${id}`}>
                <ImageListItem key={movie.id}>
                  <img
                    src={`${image}?w=100&fit=crop&auto=format`}
                    srcSet={`${image}?w=100&fit=crop&auto=format&dpr=2 2x`}
                    alt={movie.title}
                    loading="lazy"
                  />

                  <ImageListItemBar title={movie.title} position="below" />
                </ImageListItem>
              </Link>
            );
          });
  }

  return (
    <>
      <Typography variant="h1" gutterBottom>
        Movies
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
