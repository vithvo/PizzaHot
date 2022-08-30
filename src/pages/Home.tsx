import React, { useEffect } from "react";
import { useSelector } from "react-redux";
// import qs from "qs";
import { Link } from "react-router-dom";

import { selectFilter, setCurrentPage } from "../redux/slices/filterSlice";
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzasSlice";
import Categories from "../components/Categories";
import Sort from "../components/Sort/index";
import PizzaBlock from "../components/PizzaBlock";
import PizzaLoader from "../components/PizzaBlock/PizzaLoader";
import Pagination from "../components/Pagination";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const { sortType, searchValue, categoryName, currentPage } = useSelector(selectFilter);
  const { items, isLoading } = useSelector(selectPizzaData);

  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  // const isSearch = useRef(false);
  // const isMounted = useRef(false);

  const getPizzas = async () => {
    const sortBy = sortType.sortProperty.replace("-", "");
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryName !== "Все" ? `&category=${categoryName}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage: String(currentPage),
      })
    );
  };

  // Проверяем был ли первый рендер, если не было - не меняем адресную строку. Если рендер был - вшиваем параметры в адресную строку

  // useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sortType.sortProperty,
  //       categoryName,
  //       currentPage,
  //     });
  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [categoryName, sortType.sortProperty, currentPage]);

  // // Если был первый рендер, то проверяем URL параметры и сохраняем в Redux

  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.replace("?", ""));
  //     const sortType = sortItem.find((obj) => obj.sortProperty === params.sortProperty);

  //     dispatch(
  //       setFilters({
  //         searchValue,
  //         categoryName: String(params.category),
  //         sortType: sortType || sortItem[0],
  //         currentPage: Number(params.currentPage),
  //       })
  //     );

  //     isSearch.current = true;
  //   }
  // }, []);

  // Если быд первый рендер - то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);

    // !isSearch.current && 
		getPizzas();

    // isSearch.current = false;
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
