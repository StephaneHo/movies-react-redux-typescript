import { useState, useRef } from "react"
//! Icons
import { MdClose } from "react-icons/md"
//! Types
import type { DataType } from "./utils"
//! Styles
import { Wrapper, DataResult } from "./SearchBar.styles"

interface Props{
  handleFilter: any,
  clearInput: any
  wordEntered: any,
  inputRef: any
}

const SearchBar = ({
  handleFilter, clearInput, wordEntered, inputRef
}: Props) => {



  return (
    <Wrapper>
      <div className="searchInputs">
        <input
          type="text"
          placeholder="Enter a Book Name..."
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
  )
}

export { SearchBar }
