import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryName } from "../../redux/filter/slice";
// import { useWhyDidYouUpdate } from "ahooks";

const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

const Categories: React.FC = memo(() => {
  const categoryName = useSelector((state: any) => state.filter.categoryName);
  const dispatch = useDispatch();

  // useWhyDidYouUpdate("Categoties", { categoryName });

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
});

export default Categories;
