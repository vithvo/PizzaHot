import React, { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"

import Header from "./components/Header"

import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Cart from "./pages/Cart"

import "./scss/app.scss"

function App() {
  const [items, setItems] = useState([])
  const [isLoading, setIsloading] = useState(true)

  useEffect(() => {
    fetch("https://6304caef94b8c58fd72534d6.mockapi.io/items")
      .then((res) => {
        return res.json()
      })
      .then((arr) => {
        setItems(arr)
        setIsloading(false)
      })
  }, [])

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home isLoading={isLoading} items={items} />} />
          <Route path="/Cart" element={<Cart isLoading={isLoading} items={items} />} />
          <Route path="*" element={<NotFound isLoading={isLoading} items={items} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
