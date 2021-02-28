import React, { useRef } from "react";
import Slide from "./components/slide/Slide";
import SlideIndicator from "./components/slideIndicator/SlideIndicator";
import Buttons from "./components/buttons/Buttons";
import Cursor from "./components/cursor/Cursor";
import UseSlider from "./useSlider/UseSlider";
import { images } from "./components/helpers/data";
import "./app.css";

export default function App() {
  const containerRef = useRef();
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
      <Cursor />
      <div className="container" ref={containerRef}>
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
