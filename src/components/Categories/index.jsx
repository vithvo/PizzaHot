import React, { useState } from "react";

export default function Categories() {
  const [activeCategories, setActiveCategories] = useState("Все");

  const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

  return (
    <div className="categories">
      <ul>
        {categories.map((item, i) => (
          <li
            key={i}
            onClick={() => setActiveCategories(item)}
            className={activeCategories === item ? "active" : ""}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
