import React, { useEffect, useState } from "react";

import Categories from "./components/Categories";
import Header from "./components/Header";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";

import "./scss/app.scss";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://6304caef94b8c58fd72534d6.mockapi.io/items")
      .then((res) => {
        return res.json();
      })
      .then((arr) => setItems(arr));
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map((item) => (
              <PizzaBlock
                key={item.id}
                {...item}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
