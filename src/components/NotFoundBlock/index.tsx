import React from "react";

import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock: React.FC = () => {
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
};

export default NotFoundBlock;
