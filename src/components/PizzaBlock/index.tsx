import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItemById } from "../../redux/cart/selectors";
import { setItem } from "../../redux/cart/slice";
import { CartItemType } from "../../redux/cart/types";

export const typesPizza = ["Тонкое", "Традиционное"];

type PizzaBlockProp = {
  id: string;
  title: string;

  price: number;
  types: number[];
  image: string;
  sizes: number[];
};

export const PizzaBlock: React.FC<PizzaBlockProp> = ({ id, title, price, image, sizes, types }) => {
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const dispatch = useDispatch();

  const cartItem = useSelector(selectCartItemById(id));

  const priceType = activeType ? price * 1.2 : price;
  price = activeSize
    ? activeSize == 1
      ? Math.ceil(priceType * 1.16)
      : Math.ceil(priceType * 1.54)
    : priceType;

  const onClickAdd = () => {
    const item: CartItemType = {
      id,

      title,
      price,
      image,
      type: typesPizza[activeType],
      size: sizes[activeSize],
      count: 0,
    };

    dispatch(setItem(item));
  };

  const addedCount = cartItem ? cartItem.count : 0;
  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={image} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        <div onClick={(event) => event.preventDefault()} className="pizza-block__selector">
          <ul>
            {types.map((type, index) => (
              <li
                onClick={() => {
                  setActiveType(type);
                }}
                className={activeType === type ? "active" : ""}
                key={index}
              >
                {typesPizza[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                onClick={() => {
                  setActiveSize(index);
                }}
                className={activeSize === index ? "active" : ""}
                key={index}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div onClick={(event) => event.preventDefault()} className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button onClick={() => onClickAdd()} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};
