import React from "react";
import { SLIDER_LENGTH } from "../helpers/data";
import Indicator from "./indicator/Indicator";
import "./slide-indicator.css";

export default function SlideIndicator({ index, handleIndicator }) {
  const indicatorIndex = Math.abs(index);
  const indicatorArr = Array.from({ length: SLIDER_LENGTH + 1 });
  const indicators = indicatorArr.map((item, i) => {
    return i === indicatorIndex ? (
      <Indicator
        key={i}
        addClass="indicator--active"
        id={i}
        indicator={handleIndicator}
      />
    ) : (
      <Indicator key={i} id={i} indicator={handleIndicator} />
    );
  });
  return <div className="slideIndicator">{indicators}</div>;
}
