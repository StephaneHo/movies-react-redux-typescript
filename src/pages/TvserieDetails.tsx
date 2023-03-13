import { Skeleton } from "@mui/material";
import { useParams } from "react-router-dom";
import { ErrorMessage } from "../components/Error";
import { useGetMovieDetailsQuery } from "../store/apis/moviesApi";
import { useGetTvserieDetailsQuery } from "../store/apis/tvseriesApi";
import { IMAGE_BASE_URL } from "../utils/constants";

export const TvserieDetails = () => {
  const params = useParams();
  const movieId = params.tvserieId;
  const { data, isError, isLoading } = useGetTvserieDetailsQuery(movieId) || {};
  console.log(data);

  let content;
  if (isLoading) {
    content = <Skeleton />;
  } else if (isError) {
    content = (
      <ErrorMessage message="error loading the details of the tv serie" />
    );
  } else {
    const image = IMAGE_BASE_URL + data.backdrop_path;
    content = (
      <>
        <h1>{data.name}</h1>
        <h2>{data.tagline}</h2>
        <p>{data.overview}</p>
        <img
          src={`${image}?w=100&fit=crop&auto=format`}
          srcSet={`${image}?w=100&fit=crop&auto=format&dpr=2 2x`}
          alt={data.name}
          loading="lazy"
        />
      </>
    );
  }

  return <>{content}</>;
};
