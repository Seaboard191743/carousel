import { useState, useEffect, useRef } from "react";
import { SLIDER_LENGTH } from "../components/helpers/data";

export default function UseSlider() {
  const [elemWidth, setElemWidth] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [status, setStatus] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [currentPos, setCurrentPos] = useState(0);
  const [diffPos, setDiffPos] = useState(0);
  const [cPosX, setCPosX] = useState(0);
  const [cPosY, setCPosY] = useState(0);

  const sliderRef = useRef();
  const cursorRef = useRef();

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
    cursorRef.current.classList.add("cursor--animation");
    setStatus(true);
    setStartPos(e.clientX);
    setCPosX(e.clientX);
    setCPosY(e.clientY);
    setElemWidth(e.target.getBoundingClientRect().width);
  }

  function handleMove(e) {
    e.preventDefault();
    if (status) {
      setCurrentPos(e.clientX);
      setDiffPos(currentPos - startPos);
    }
  }

  function handleEnd(e) {
    e.preventDefault();
    if (diffPos < 0 && Math.abs(diffPos) > elemWidth / 4) {
      handleNext(e);
    }
    if (diffPos > 0 && diffPos > elemWidth / 4) {
      handlePrev(e);
    }
    setTimeout(
      () => cursorRef.current.classList.remove("cursor--animation"),
      500
    );
    setStatus(false);
  }

  useEffect(() => {
    sliderRef.current.addEventListener("pointerdown", handleStart);
    sliderRef.current.addEventListener("pointermove", handleMove);
    sliderRef.current.addEventListener("pointerup", handleEnd);

    return () => {
      sliderRef.current.removeEventListener("pointerdown", handleStart);
      sliderRef.current.removeEventListener("pointermove", handleMove);
      sliderRef.current.removeEventListener("pointerup", handleEnd);
    };
  });
  console.log(cPosX, cPosY);
  return {
    handleNext,
    handlePrev,
    sliderRef,
    cursorRef,
    currentTranslate,
    cPosX,
    cPosY,
    setCurrentTranslate,
  };
}
