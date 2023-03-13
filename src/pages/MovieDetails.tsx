import { Skeleton } from "@mui/material";
import { useParams } from "react-router-dom";
import { ErrorMessage } from "../components/Error";
import { useGetMovieDetailsQuery } from "../store/apis/moviesApi";

export const MovieDetails = () => {
  const params = useParams();
  const movieId = params.movieId;
  const { data, isError, isLoading } = useGetMovieDetailsQuery(movieId) || {};
  console.log(data);

  let content;
  if (isLoading) {
    content = <Skeleton />;
  } else if (isError) {
    content = <ErrorMessage message="error loading the details of the movie" />;
  } else {
    content = (
      <>
        <h1>{data.title}</h1>
        <h2>{data.tagline}</h2>
        <p>{data.overview}</p>
      </>
    );
  }

  return <>{content}</>;
};
