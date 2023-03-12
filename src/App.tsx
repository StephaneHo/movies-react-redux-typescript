import React, { useState, useRef } from 'react';
import logo from './logo.svg';

import './App.css';
import { useFetchMoviesQuery } from './app/store';
import Skeleton from './components/Skeleton';
import ExpandablePanel from './components/ExpandablePanel';
import { SearchBar } from './components/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovie } from './store/apis/movieSlice';
import { useSearchMovieByTitleQuery } from './store/apis/movies-api';


function App() {

  const [inputText, setInputText] = useState("");
  const [wordEntered, setWordEntered] = useState<string>("")
  const dispatch = useDispatch();
  const {movieSearch} = useSelector((state: any) => state?.movie);
  console.log("App mv search" , movieSearch);

  const inputRef: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null)
  window.addEventListener("load", () => inputRef.current?.focus())
  let inputHandler = (e: any) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const handleFilter = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const searchWord: string = target.value.toLowerCase()
    setWordEntered(searchWord);
    console.log("searchWord", searchWord)
    dispatch(searchMovie(searchWord)); 
  }

  const clearInput = (): void => {
    setWordEntered("")
    inputRef.current?.focus()
  }

  const {data: searchMovieResults, isError: movieSearchError, isLoading: movieSearchLoading} = useSearchMovieByTitleQuery(movieSearch) || {}; 
  const {data, isError, isLoading} = useFetchMoviesQuery(1) || {};
  let content;
  if (isLoading){
    content = <Skeleton times={3} className='rounded'/>;
  }
  else if (isError){
    content = <div>Error loading albums.
    </div>
  } else {
    console.log(content);
    content =  movieSearch === '' ? 
      data.results.map((movie: any) => {
        return <div>{movie.title}</div>
    }) : (
      searchMovieResults.results.map((movie: any) => {
        return <div>{movie.title}</div>
      })
    );
  }

  return <>
    <SearchBar  handleFilter={handleFilter} clearInput={clearInput} wordEntered={wordEntered} inputRef={inputRef} />
    {content}
  </>;
}

export default App;
