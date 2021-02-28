import React from "react";
import Slide from "./components/slide/Slide";
import SlideIndicator from "./components/slideIndicator/SlideIndicator";
import Buttons from "./components/buttons/Buttons";
import UseSlider from "./useSlider/UseSlider";
import { images } from "./components/helpers/data";
import "./app.css";

export default function App() {
  const {
    handleNext,
    handlePrev,
    sliderRef,
    currentTranslate,
    setCurrentTranslate,
  } = UseSlider();
  const slides = images.map((img) => <Slide key={img.id} src={img.src} />);
  const btnsPorps = { handlePrev, handleNext };
  return (
    <>
      <div className="container">
        <div
          className="slider"
          ref={sliderRef}
          style={{ transform: `translateX(${currentTranslate * 100}%)` }}
        >
          {slides}
        </div>
        <Buttons {...btnsPorps} />
      </div>
      <SlideIndicator
        index={currentTranslate}
        handleIndicator={setCurrentTranslate}
      />
    </>
  );
}
