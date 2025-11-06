import React, { useEffect, useRef, useState } from "react";

export default function FuzzyText({
  text = "Octopus",
  color = "#f0abfc",
  hoverColor = "#a855f7",
  fontSize = "6rem",
  intensity = 3,
  speed = 40,
}) {
  const textRef = useRef(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!hover) return;
    const letters = textRef.current.querySelectorAll(".letter");

    const interval = setInterval(() => {
      letters.forEach((letter) => {
        const dx = (Math.random() - 0.5) * intensity;
        const dy = (Math.random() - 0.5) * intensity;
        const blur = Math.random() * 1.5;

        letter.style.transform = `translate(${dx}px, ${dy}px)`;
        letter.style.textShadow = `
          ${Math.random() * 2}px ${Math.random() * 2}px ${blur}px ${hoverColor},
          ${-Math.random() * 2}px ${Math.random() * 2}px ${blur}px ${hoverColor}
        `;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [hover, intensity, speed, hoverColor]);

  return (
    <h1
      ref={textRef}
      className="font-bold select-none transition-all duration-500 ease-out"
      style={{
        display: "flex",
        justifyContent: "center",
        fontSize,
        color,
        letterSpacing: "0.05em",
        cursor: "default",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        textRef.current
          .querySelectorAll(".letter")
          .forEach((l) => {
            l.style.transform = "translate(0,0)";
            l.style.textShadow = "none";
          });
      }}
    >
      {text.split("").map((letter, index) => (
        <span key={index} className="letter inline-block relative">
          {letter}
        </span>
      ))}
    </h1>
  );
}
