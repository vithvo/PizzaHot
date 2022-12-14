import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    image: string;
    title: string;
    price: number;
    desc: string;
  }>();
  const { id } = useParams();
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

  return (
    <>
      {pizza && (
        <>
          <div className="fullPizza">
            <img src={pizza.image} alt="Pizza" />
            <div className="fullPizzaDiscription">
              <h2>{pizza.title}</h2>
              <h3>{pizza.desc}</h3>
              <h4>{pizza.price} руб.</h4>
              <Link to="/">
                <button className="button button--black">
                  <span>Вернуться назад</span>
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FullPizza;
