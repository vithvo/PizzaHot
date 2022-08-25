import React, { useEffect, useState, useContext } from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaLoader from "../components/PizzaBlock/PizzaLoader";
import Pagination from "../components/Pagination";

import { SearchContext } from "../App";

export default function Home({}) {
  const { searchValue, setSearchValue } = useContext(SearchContext);

  const [items, setItems] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [categoryName, setCategoryName] = useState("Все");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({ name: "выберите", sortProperty: "rating" });

  useEffect(() => {
    setIsloading(true);

    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sortType.sortProperty.replace("-", "");
    const category = categoryName !== "Все" ? `&category=${categoryName}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    fetch(
      `https://6304caef94b8c58fd72534d6.mockapi.io/items?page=${currentPage}&limit=8${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setIsloading(false);
      });

    // window.scrollTo(0, 0);
  }, [categoryName, sortType, searchValue, currentPage]);

  const pizzas = items
    .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((item) => <PizzaBlock key={item.id} {...item} />);

  const pizzasLoader = [...new Array(8)].map((_, index) => <PizzaLoader key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryName}
          onClickCategory={(categoryName) => setCategoryName(categoryName)}
        />
        <Sort value={sortType} onClickSort={(sortType) => setSortType(sortType)} />
      </div>
      <h2 className="content__title">Все пиццы </h2>

      <div className="content__items">{isLoading ? pizzasLoader : pizzas}</div>

      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
}
