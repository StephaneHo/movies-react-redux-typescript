import { Skeleton } from "@mui/material";
import { useParams } from "react-router-dom";
import { ErrorMessage } from "../components/Error";
import { useGetMovieDetailsQuery } from "../store/apis/moviesApi";
import { IMAGE_BASE_URL } from "../utils/constants";

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
    const image = IMAGE_BASE_URL + data.backdrop_path;
    content = (
      <>
        <h1>{data.title}</h1>
        <h2>{data.tagline}</h2>
        <p>{data.overview}</p>
        <img
          src={`${image}?w=100&fit=crop&auto=format`}
          srcSet={`${image}?w=100&fit=crop&auto=format&dpr=2 2x`}
          alt={data.title}
          loading="lazy"
        />
      </>
    );
  }

  return <>{content}</>;
};
