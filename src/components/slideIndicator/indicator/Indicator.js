import React from "react";
import UseSlider from "../../../useSlider/UseSlider";
import "./indicator.css";

export default function Indicator({ addClass, id, indicator }) {
  return (
    <div
      className={`indicator ${addClass}`}
      onClick={() => indicator(-id)}
    ></div>
  );
}
