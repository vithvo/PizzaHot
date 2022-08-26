import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import qs from "qs";

import { setCurrentPage, setFilters } from "../redux/slices/filterSlice";
import Categories from "../components/Categories";
import Sort, { sortItem } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaLoader from "../components/PizzaBlock/PizzaLoader";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { sortType, searchValue, categoryName, currentPage } = useSelector((state) => state.filter);

  const [items, setItems] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const fetchPizzas = () => {
    setIsloading(true);

    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sortType.sortProperty.replace("-", "");
    const category = categoryName !== "Все" ? `&category=${categoryName}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    axios
      .get(
        `https://6304caef94b8c58fd72534d6.mockapi.io/items?page=${currentPage}&limit=8${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((res) => {
        setItems(res.data);
        setIsloading(false);
      });
  };

  // Проверяем был ли первый рендер, если не было - не меняем адресную строку. Если рендер был - вшиваем параметры в адресную строку

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryName,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryName, sortType.sortProperty, currentPage]);

  // Если был первый рендер, то проверяем URL параметры и сохраняем в Redux

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.replace("?", ""));
      const sortType = sortItem.find((obj) => obj.sortProperty === params.sortProperty);
      // console.log(params);

      dispatch(setFilters({ ...params, sortType }));

      isSearch.current = true;
    }
  }, []);

  // Если быд первый рендер - то запрашиваем пиццы

  useEffect(() => {
    window.scrollTo(0, 0);

    !isSearch.current && fetchPizzas();

    isSearch.current = false;
  }, [categoryName, sortType, searchValue, currentPage]);

  const pizzas = items
    .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((item) => <PizzaBlock key={item.id} {...item} />);

  const pizzasLoader = [...new Array(8)].map((_, index) => <PizzaLoader key={index} />);

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      <div className="content__items">{isLoading ? pizzasLoader : pizzas}</div>

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}
