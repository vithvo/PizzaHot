import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setSortType } from "../../redux/slices/filterSlice";

type SortItemType = {
  name: string;
  sortProperty: string;
};

export const sortItem: SortItemType[] = [
  { name: "популярности ᐃ", sortProperty: "-rating" },
  { name: "популярности ᐁ", sortProperty: "rating" },
  { name: "цене ᐃ", sortProperty: "-price" },
  { name: "цене ᐁ", sortProperty: "price" },
  { name: "алфавиту ᐃ", sortProperty: "-title" },
  { name: "алфавиту ᐁ", sortProperty: "title" },
];

const Sort: React.FC = () => {
  const sortType = useSelector((state: any) => state.filter.sortType);
  const dispatch = useDispatch();

  const [openSort, setOpenSort] = useState(false);

  const onClickSort = (sort: SortItemType) => {
    dispatch(setSortType(sort));
  };

  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      console.log(event);
      if (!event.path.includes(sortRef.current)) {
        setOpenSort(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);

    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          className={openSort ? "rotate" : ""}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpenSort(!openSort)}>{sortType.name}</span>
      </div>

      <div className={openSort ? "sort__popup sort__popup-opened" : "sort__popup"}>
        <ul>
          {sortItem.map((sort, index) => (
            <li
              key={index}
              onClick={() => {
                onClickSort(sort);
                setOpenSort(!openSort);
              }}
              className={sortType.name === sort.name ? "active" : ""}
            >
              {sort.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sort;
