import { Typography } from "@mui/material";

interface Props {
  text: string;
}

export const Title = ({ text }: Props) => (
  <Typography variant="h1" gutterBottom>
    {text}
  </Typography>
);
