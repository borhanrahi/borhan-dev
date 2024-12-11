import { useState, useEffect } from "react";

export function useScrambleText(
  text: string,
  chars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  speed: number = 30
) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let frame: number;
    let iteration = 0;

    const scramble = () => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration < text.length) {
        iteration += 0.5;
        frame = requestAnimationFrame(scramble);
      }
    };

    frame = requestAnimationFrame(scramble);

    return () => cancelAnimationFrame(frame);
  }, [text, chars, speed]);

  return displayText;
}
