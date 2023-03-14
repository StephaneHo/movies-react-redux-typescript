import React from "react";
import { Link } from "react-router-dom";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { IMAGE_BASE_URL } from "../../utils/constants";

interface Props {
  id: number;
  imagePath?: string;
  title: string;
}

export const Item = ({ id, imagePath, title }: Props) => {
  const image = IMAGE_BASE_URL + imagePath;
  return (
    <ImageListItem key={id}>
      <img
        src={`${image}?w=100&fit=crop&auto=format`}
        srcSet={`${image}?w=100&fit=crop&auto=format&dpr=2 2x`}
        alt={title}
        loading="lazy"
      />

      <ImageListItemBar title={title} position="below" />
    </ImageListItem>
  );
};
