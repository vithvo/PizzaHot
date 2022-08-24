import React from "react"

export default function Categories({ value, onClickCategory }) {
  const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"]

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => onClickCategory(categoryName)}
            className={value === categoryName ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  )
}
