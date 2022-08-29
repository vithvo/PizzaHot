import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import qs from "qs";
import { Link, useNavigate } from "react-router-dom";

import { selectFilter, setCurrentPage, setFilters } from "../redux/slices/filterSlice";
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzasSlice";
import Categories from "../components/Categories";
import Sort, { sortItem } from "../components/Sort/index";
import PizzaBlock from "../components/PizzaBlock";
import PizzaLoader from "../components/PizzaBlock/PizzaLoader";
import Pagination from "../components/Pagination";

const Home: React.FC = () => {
  const { sortType, searchValue, categoryName, currentPage } = useSelector(selectFilter);
  const { items, isLoading } = useSelector(selectPizzaData);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const getPizzas = async () => {
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sortType.sortProperty.replace("-", "");
    const category = categoryName !== "Все" ? `&category=${categoryName}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      // @ts-ignore
      fetchPizzas({ order, sortBy, category, search, currentPage })
    );
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

    !isSearch.current && getPizzas();

    isSearch.current = false;
  }, [categoryName, sortType, searchValue, currentPage]);

  const pizzas = items.map((item: any) => (
    <Link key={item.id} to={`/pizza/${item.id}`}>
      <PizzaBlock {...item} />
    </Link>
  ));

  const pizzasLoader = [...new Array(8)].map((_, index) => <PizzaLoader key={index} />);

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      {isLoading === "error" ? (
        <div className="cart cart--empty">
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению, не удалось получить пиццы,
            <br />
            попробуйте повторить попытку позже
          </p>
        </div>
      ) : (
        <div className="content__items">{isLoading === "loading" ? pizzasLoader : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
