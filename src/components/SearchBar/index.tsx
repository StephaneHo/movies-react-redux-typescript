import { MdClose } from "react-icons/md";
import classes from "./styles.module.css";
interface Props {
  handleFilter: (arg: React.ChangeEvent<HTMLInputElement>) => void;
  clearInput: () => void;
  wordEntered: string;
  inputRef?: React.RefObject<HTMLInputElement>;
}

const SearchBar = ({
  handleFilter,
  clearInput,
  wordEntered,
  inputRef,
}: Props) => {
  return (
    <div className={classes.searchInputs}>
      <input
        aria-label="search"
        type="text"
        placeholder="Enter a name..."
        value={wordEntered}
        onChange={handleFilter}
        ref={inputRef}
      />
      <div className={classes.searchIcon}>
        {wordEntered.length !== 0 && (
          <MdClose id="clearBtn" onClick={clearInput} aria-label="clear" />
        )}
      </div>
    </div>
  );
};

export { SearchBar };
