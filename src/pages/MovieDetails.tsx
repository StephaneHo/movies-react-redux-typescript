import { useParams } from "react-router-dom";
import { useGetMovieDetailsQuery } from "../store/apis/moviesApi";

export const MovieDetails = () => {
  const params = useParams();
  const movieId = params.movieId;
  const { data, isError, isLoading } = useGetMovieDetailsQuery(movieId) || {};
  console.log(data);

  return (
    <>
      <h1>Movie Details</h1>
      {data.overview}
    </>
  );
};
