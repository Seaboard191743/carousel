import React from "react";
import "./buttons.css";

export default function Buttons({ handlePrev, handleNext }) {
  return (
    <>
      <button className="btn prevBtn" onClick={handlePrev}>
        <span className="btn__text">Prev</span>
      </button>
      <button className="btn nextBtn" onClick={handleNext}>
        <span className="btn__text">Next</span>
      </button>
    </>
  );
}
