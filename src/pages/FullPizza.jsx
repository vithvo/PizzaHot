import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FullPizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const { data } = await axios.get("https://6304caef94b8c58fd72534d6.mockapi.io/items/" + id);
        setPizza(data);
      } catch (error) {
        console.log("Ошибка при получении данных о пицце", error);
        navigate("/");
      }
    };

    fetchPizza();
  }, []);
  console.log(pizza);

  return (
    <>
      {pizza ? (
        <div className="container cart--empty">
          <img src={pizza.image} alt="Pizza" />
          <h2>{pizza.title}</h2>
          <h4>{pizza.price}</h4>
        </div>
      ) : (
        <div className="cart--empty">
          <h1>Загрузка...</h1>
        </div>
      )}
    </>
  );
};

export default FullPizza;
