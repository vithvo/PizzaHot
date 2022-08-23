import React from "react";

import Categories from "./components/Categories";
import Header from "./components/Header";
import Sort from "./components/Sort";
import Block from "./components/PizzaBlock";

import "./scss/app.scss";

function App() {
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
            <Block
              title="Мексиканская"
              price={500}
              imgUrl="./img/pizza/1.png"
            />
            <Block
              title="Перуанская"
              price={450}
              imgUrl="./img/pizza/2.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
