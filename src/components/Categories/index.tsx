import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setCategoryName } from "../../redux/slices/filterSlice";

const Categories: React.FC = () => {
  const categoryName = useSelector((state: any) => state.filter.categoryName);
  const dispatch = useDispatch();

  const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

  const onClickCategory = (name: string) => {
    dispatch(setCategoryName(name));
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((name, i) => (
          <li
            key={i}
            onClick={() => onClickCategory(name)}
            className={categoryName === name ? "active" : ""}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
