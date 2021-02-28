import React, { useState, useEffect, useRef } from "react";
import "./cursor.css";

export default function Cursor() {
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [cursorActive, setCursorActive] = useState(false);
  const cursorRef = useRef();
  const styles = { left: posX, top: posY };
  function handlePos(e) {
    setPosX(e.pageX);
    setPosY(e.pageY);
  }

  function handleOver(e) {
    const target = e.target;
    if (target.closest(".container") || target.matches(".indicator")) {
      cursorRef.current.classList.add("cursor--hover");
    } else {
      cursorRef.current.classList.remove("cursor--hover");
    }
  }
  function handleDown(e) {
    if (e.target.closest(".slider")) {
      cursorRef.current.classList.add("expand");
    }
  }
  function handleUp() {
    cursorRef.current.classList.remove("expand");
  }

  useEffect(() => {
    document.body.addEventListener("mousemove", handlePos);
    document.body.addEventListener("mouseover", handleOver);
    document.body.addEventListener("mousedown", handleDown);
    document.body.addEventListener("mouseup", handleUp);
    return () => {
      document.body.removeEventListener("mousemove", handlePos);
      document.body.removeEventListener("mouseover", handleOver);
      document.body.removeEventListener("mousedown", handleDown);
      document.body.removeEventListener("mouseup", handleUp);
    };
  });

  return <div className="cursor" style={styles} ref={cursorRef}></div>;
}
