import React from "react";
import { Link } from "react-router-dom";

import styles from "./NotFoundBlock.module.scss";

export default function NotFoundBlock() {
  return (
    <div className={styles.notfound}>
      <h1>
        <span>😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p>
        К сожалению, данная страница отсутствует <br /> в нашем интернет магазине.
      </p>
    </div>
  );
}
