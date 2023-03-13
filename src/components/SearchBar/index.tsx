import { MdClose } from "react-icons/md";
import { Wrapper } from "./styles";

interface Props {
  handleFilter: (arg: React.ChangeEvent<HTMLInputElement>) => void;
  clearInput: () => void;
  wordEntered: string;
  inputRef: React.RefObject<HTMLInputElement>;
}

const SearchBar = ({
  handleFilter,
  clearInput,
  wordEntered,
  inputRef,
}: Props) => {
  return (
    <Wrapper>
      <div className="searchInputs">
        <input
          type="text"
          placeholder="Enter the name of a movie..."
          value={wordEntered}
          onChange={handleFilter}
          ref={inputRef}
        />
        <div className="searchIcon">
          {wordEntered.length !== 0 && (
            <MdClose id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export { SearchBar };
