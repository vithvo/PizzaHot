import React, { useEffect, useState } from "react"

import Categories from "../components/Categories"
import Sort from "../components/Sort"
import PizzaBlock from "../components/PizzaBlock"
import PizzaLoader from "../components/PizzaBlock/PizzaLoader"

export default function Home({}) {
  const [items, setItems] = useState([])
  const [isLoading, setIsloading] = useState(true)
  const [categoryName, setCategoryName] = useState("все")
  const [sortType, setSortType] = useState({ name: "популярности", sortProperty: "rating" })

  console.log(categoryName, sortType)

  useEffect(() => {
    setIsloading(true)
    fetch("https://6304caef94b8c58fd72534d6.mockapi.io/items?category=" + categoryName)
      .then((res) => {
        return res.json()
      })
      .then((arr) => {
        setItems(arr)
        setIsloading(false)
      })
    window.scrollTo(0, 0)
  }, [categoryName, sortType])

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryName}
          onClickCategory={(categoryName) => setCategoryName(categoryName)}
        />
        <Sort value={sortType} onClickSort={(sortType) => setSortType(sortType)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, index) => <PizzaLoader key={index} />)
          : items.map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>
    </div>
  )
}
