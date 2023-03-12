import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import { useFetchMoviesQuery } from "./../app/store";
import Skeleton from "./../components/Skeleton";
import { SearchBar } from "./../components/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { searchMovie } from "./../store/apis/movieSlice";
import { useSearchMovieByTitleQuery } from "./../store/apis/movies-api";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Typography } from "@mui/material";

export const Movies = () => {
  const [inputText, setInputText] = useState("");
  const [wordEntered, setWordEntered] = useState<string>("");
  const dispatch = useDispatch();
  const { movieSearch } = useSelector((state: any) => state?.movie);
  console.log("App mv search", movieSearch);

  const inputRef: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  window.addEventListener("load", () => inputRef.current?.focus());
  let inputHandler = (e: any) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const handleFilter = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const searchWord: string = target.value.toLowerCase();
    setWordEntered(searchWord);
    console.log("searchWord", searchWord);
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
    console.log(content);
    content =
      movieSearch === ""
        ? data.results.map((movie: any) => {
            return <div>{movie.title}</div>;
          })
        : searchMovieResults.results.length > 1 &&
          searchMovieResults.results.map((movie: any) => {
            const image =
              "https://image.tmdb.org/t/p/original/" + movie.backdrop_path;
            return (
              <ImageListItem key={movie.id}>
                <img
                  src={`${image}?w=100&fit=crop&auto=format`}
                  srcSet={`${image}?w=100&fit=crop&auto=format&dpr=2 2x`}
                  alt={movie.title}
                  loading="lazy"
                />
                <ImageListItemBar title={movie.title} position="below" />
              </ImageListItem>
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
