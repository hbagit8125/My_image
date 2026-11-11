"use client";

import { useEffect, useState } from "react";

/**
 * Types each phrase, pauses, deletes it and moves to the next.
 * Screen readers get the full list once instead of the animation.
 */
export default function Typewriter({ phrases }: { phrases: string[] }) {
  const [text, setText] = useState(phrases[0] ?? "");

  useEffect(() => {
    if (phrases.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let phrase = 0;
    let length = phrases[0].length;
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = phrases[phrase];
      if (deleting) {
        length -= 1;
        setText(current.slice(0, length));
        if (length === 0) {
          deleting = false;
          phrase = (phrase + 1) % phrases.length;
          timer = setTimeout(tick, 350);
          return;
        }
        timer = setTimeout(tick, 35);
      } else {
        length += 1;
        setText(current.slice(0, length));
        if (length === current.length) {
          deleting = true;
          timer = setTimeout(tick, 1900);
          return;
        }
        timer = setTimeout(tick, 65);
      }
    };

    // Let the first phrase sit for a moment before the loop starts.
    timer = setTimeout(tick, 2600);
    return () => clearTimeout(timer);
  }, [phrases]);

  return (
    <>
      <span className="sr-only">{phrases.join(", ")}</span>
      <span aria-hidden="true">
        {text}
        <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[0.18em] bg-glow animate-blink" />
      </span>
    </>
  );
}
