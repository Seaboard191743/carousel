import React from "react";
import "./slide.css";

export default function Slide({ src }) {
  return (
    <div className="slide">
      <img className="slide__img" src={src} alt="image" />
    </div>
  );
}
