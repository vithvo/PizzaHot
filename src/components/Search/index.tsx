import React, { useCallback, useRef, useState } from "react";
import debounce from "lodash.debounce";

import { useDispatch } from "react-redux";

import { setSearchValue } from "../../redux/filter/slice";
import styles from "./Search.module.scss";

const Search: React.FC = () => {
  const [value, setValue] = useState("");

  const dispatch = useDispatch();

  const updateSearch = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 250),
    []
  );

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearch(event.target.value);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.search}>
      <svg
        className={styles.icon}
        height="32px"
        id="Layer_1"
        enableBackground="new 0 0 32 32"
        version="1.1"
        viewBox="0 0 32 32"
        width="32px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(576 192)">
          <path d="M-544.88-165.121l-7.342-7.342c-1.095,1.701-2.541,3.148-4.242,4.242l7.343,7.342c1.172,1.172,3.071,1.172,4.241,0   C-543.707-162.048-543.707-163.947-544.88-165.121z" />
          <path d="M-552-180c0-6.627-5.373-12-12-12s-12,5.373-12,12s5.373,12,12,12S-552-173.373-552-180z M-564-171c-4.964,0-9-4.036-9-9   c0-4.963,4.036-9,9-9c4.963,0,9,4.037,9,9C-555-175.036-559.037-171-564-171z" />
          <path d="M-571-180h2c0-2.757,2.242-5,5-5v-2C-567.86-187-571-183.858-571-180z" />
        </g>
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChange}
        className={styles.input}
        type="text"
        placeholder="Поиск пиццы..."
      />
      {value && (
        <svg
          onClick={() => {
            dispatch(setSearchValue(""));
            setValue("");
            inputRef.current?.focus();
          }}
          className={styles.iconClose}
          enableBackground="new 0 0 24 24"
          version="1.1"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="icons">
            <path
              d="M14.8,12l3.6-3.6c0.8-0.8,0.8-2,0-2.8c-0.8-0.8-2-0.8-2.8,0L12,9.2L8.4,5.6c-0.8-0.8-2-0.8-2.8,0   c-0.8,0.8-0.8,2,0,2.8L9.2,12l-3.6,3.6c-0.8,0.8-0.8,2,0,2.8C6,18.8,6.5,19,7,19s1-0.2,1.4-0.6l3.6-3.6l3.6,3.6   C16,18.8,16.5,19,17,19s1-0.2,1.4-0.6c0.8-0.8,0.8-2,0-2.8L14.8,12z"
              id="exit"
            />
          </g>
        </svg>
      )}
    </div>
  );
};

export default Search;
