import TextField from "@mui/material/TextField";

type Props = {
    inputHandler: (arg: string) => void
}

export const Search = ({inputHandler}: Props) => {

    return (
    <div className="main">
    <h1>React Search</h1>
    <div className="search">
      <TextField
        id="outlined-basic"
        variant="outlined"
        fullWidth
        label="Search"
       // onChange={inputHandler}
      />
    </div>
  </div>);
}