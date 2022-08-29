import React from "react";
import { Link } from "react-router-dom";

import cartEmpty from "../../assets/img/cartEmpty.svg";

const CartEmpty: React.FC = () => {
  return (
    <div className="cart cart--empty">
      <h2>Корзина пустая 😕</h2>
      <p>
        Вероятней всего, вы не заказывали ещё пиццу.
        <br />
        Для того, чтобы заказать пиццу, перейди на главную страницу.
      </p>
      <img width={350} height={270} src={cartEmpty} alt="Empty cart" />

      <Link to="/">
        <button className="button button--black">
          <span>Вернуться назад</span>
        </button>
      </Link>
    </div>
  );
};

export default CartEmpty;
