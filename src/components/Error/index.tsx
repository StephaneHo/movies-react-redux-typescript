interface Props {
  message: string;
}

export const ErrorMessage = ({ message }: Props) => <p>{message}</p>;
