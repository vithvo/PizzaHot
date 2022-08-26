import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaLoader from "../components/PizzaBlock/PizzaLoader";
import Pagination from "../components/Pagination";

export default function Home({}) {
  const { sortType, searchValue, categoryName } = useSelector((state) => state.filter);

  const [items, setItems] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

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
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      <div className="content__items">{isLoading ? pizzasLoader : pizzas}</div>

      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
}
