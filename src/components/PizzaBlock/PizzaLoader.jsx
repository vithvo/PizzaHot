import React from "react";
import ContentLoader from "react-content-loader";

const PizzaLoader = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={459}
    viewBox="0 0 280 459"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect
      x="56"
      y="171"
      rx="0"
      ry="0"
      width="1"
      height="0"
    />
    <rect
      x="-2"
      y="315"
      rx="10"
      ry="10"
      width="280"
      height="85"
    />
    <rect
      x="125"
      y="419"
      rx="21"
      ry="21"
      width="155"
      height="40"
    />
    <rect
      x="0"
      y="271"
      rx="0"
      ry="0"
      width="280"
      height="24"
    />
    <rect
      x="0"
      y="432"
      rx="0"
      ry="0"
      width="89"
      height="27"
    />
    <circle
      cx="140"
      cy="120"
      r="120"
    />
  </ContentLoader>
);

export default PizzaLoader;
