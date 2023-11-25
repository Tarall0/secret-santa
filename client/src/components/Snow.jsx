import React, { useEffect, useRef } from 'react';

const Snow = () => {
  const snowContainerRef = useRef();

  const createSnow = () => {
    const snow = document.createElement("div");
    snow.classList.add("snow");

    const colors = ["#FFFAFA", "#F5F5F5", "#FCFCFC"];
    snow.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    const size = Math.floor(Math.random() * 10 + 5);
    snow.style.width = `${size}px`;
    snow.style.height = `${size}px`;

    const left = Math.floor(Math.random() * 100);
    const top = Math.floor(Math.random() * 10);
    snow.style.top = `${top}%`;
    snow.style.left = `${left}%`;

    const animationDuration = Math.floor(Math.random() * 4 + 3);
    snow.style.animation = `fall ${animationDuration}s linear`;

    const rotationAngle = Math.floor(Math.random() * 360);
    snow.style.transform = `rotate(${rotationAngle}deg)`;

    snow.addEventListener("animationend", () => {
      snow.remove();
    });

    snowContainerRef.current.appendChild(snow);
  };

 useEffect(() => {
    for (let i = 0; i < 150; i++) {
        createSnow();
    }
 }, [])

  return (
    <div>
      <div id="snowContainer" ref={snowContainerRef}></div>
    </div>
  );
};

export default Snow;
