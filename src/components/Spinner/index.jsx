import React from "react";
import deadpool from "../../assets/imgs/deadpool-logo.png";
import "./styles.scss";

function Spinner() {
  return (
    <div className="container-spinner">
      <div className="spinner">
        <img src={deadpool} alt="deadpool"/>
      </div>
      loading...
    </div>
  );
}

export { Spinner };
