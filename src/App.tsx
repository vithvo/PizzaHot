import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import MainLayouts from "./layouts/MainLayouts";
// import NotFound from "./pages/NotFound";
// import Cart from "./pages/Cart";
// import FullPizza from "./pages/FullPizza";

import "./scss/app.scss";

const Cart = lazy(() => import(/*webpackChunkName:"Cart"*/ "./pages/Cart"));
const FullPizza = lazy(() => import(/*webpackChunkName:"FullPizza"*/ "./pages/FullPizza"));
const NotFound = lazy(() => import(/*webpackChunkName:"NotFound"*/ "./pages/NotFound"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayouts />}>
        <Route path="" element={<Home />} />

        <Route
          path="Cart"
          element={
            <Suspense
              fallback={
                <div className="cart--empty">
                  <h1>Корзина загружается...</h1>
                </div>
              }
            >
              <Cart />{" "}
            </Suspense>
          }
        />

        <Route
          path="Pizza/:id"
          element={
            <Suspense
              fallback={
                <div className="cart--empty">
                  <h1>Информация о пицце загружается...</h1>
                </div>
              }
            >
              <FullPizza />{" "}
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense
              fallback={
                <div className="cart--empty">
                  <h1>Информация загружается...</h1>
                </div>
              }
            >
              <NotFound />{" "}
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
