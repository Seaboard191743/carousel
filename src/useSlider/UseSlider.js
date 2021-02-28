import { useState, useEffect, useRef } from "react";
import { SLIDER_LENGTH } from "../components/helpers/data";

export default function UseSlider() {
  const [elemWidth, setElemWidth] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [status, setStatus] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [currentPos, setCurrentPos] = useState(0);
  const [diffPos, setDiffPos] = useState(0);

  const sliderRef = useRef();

  function handleNext() {
    if (currentTranslate > -SLIDER_LENGTH) {
      setCurrentTranslate((prev) => prev - 1);
    } else {
      setCurrentTranslate(0);
    }
  }
  function handlePrev() {
    if (currentTranslate < 0) {
      setCurrentTranslate((prev) => prev + 1);
    } else {
      setCurrentTranslate(-SLIDER_LENGTH);
    }
  }
  function handleStart(e) {
    e.preventDefault();
    setStatus(true);
    setStartPos(e.clientX);
    setElemWidth(e.target.getBoundingClientRect().width);
    return false;
  }
  function handleTouchStart(e) {
    setStatus(true);
    setStartPos(e.touches[0].clientX);
  }
  function handleTouchMove(e) {
    if (status) {
      setCurrentPos(e.touches[0].clientX);
      setDiffPos(currentPos - startPos);
    }
  }
  function handleTouchEnd(e) {
    if (diffPos < 0 && Math.abs(diffPos) > elemWidth / 4) {
      handleNext(e);
    }
    if (diffPos > 0 && diffPos > elemWidth / 4) {
      handlePrev(e);
    }
    setStatus(false);
  }
  function handleEnd(e) {
    if (diffPos < 0 && Math.abs(diffPos) > elemWidth / 4) {
      handleNext(e);
    }
    if (diffPos > 0 && diffPos > elemWidth / 4) {
      handlePrev(e);
    }
    setStatus(false);
  }
  function handleMove(e) {
    e.preventDefault();
    if (status) {
      setCurrentPos(e.clientX);
      setDiffPos(currentPos - startPos);
    }
  }

  useEffect(() => {
    sliderRef.current.addEventListener("mousedown", handleStart);
    sliderRef.current.addEventListener("mousemove", handleMove);
    sliderRef.current.addEventListener("mouseup", handleEnd);
    sliderRef.current.addEventListener("touchstart", handleTouchStart);
    sliderRef.current.addEventListener("touchmove", handleTouchMove);
    sliderRef.current.addEventListener("touchend", handleTouchEnd);

    return () => {
      sliderRef.current.removeEventListener("mousedown", handleStart);
      sliderRef.current.removeEventListener("mousemove", handleMove);
      sliderRef.current.removeEventListener("mouseup", handleEnd);
      sliderRef.current.removeEventListener("touchstart", handleTouchStart);
      sliderRef.current.removeEventListener("touchmove", handleTouchMove);
      sliderRef.current.removeEventListener("touchend", handleTouchEnd);
    };
  });

  return {
    handleNext,
    handlePrev,
    sliderRef,
    currentTranslate,
    setCurrentTranslate,
  };
}
