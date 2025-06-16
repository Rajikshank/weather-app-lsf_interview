// src/components/RainEffect.tsx
import React, { useMemo } from "react";

export default function RainEffect({ dropCount = 250 }: { dropCount?: number }) {
  const drops = useMemo(
    () =>
      Array.from({ length: dropCount }).map(() => ({
        // unitless. CSS will multiply/add and add px/%, etc.
        "--x": Math.random().toFixed(2),
        "--y": Math.random().toFixed(2),
        "--delay": (Math.random() * 2).toFixed(2) + "s",
        "--duration": (Math.random() + 0.5).toFixed(2) + "s",
        "--opacity": Math.random().toFixed(2),
        "--scale": (Math.random() + 0.5).toFixed(2),
      })) as React.CSSProperties[],
    [dropCount]
  );

  return (
    <div className="rain">
      {drops.map((style, i) => (
        <svg
          key={i}
          className="rain__drop"
          viewBox="0 0 5 50"
          preserveAspectRatio="xMinYMin"
          style={style}
        >
          <path
            d="M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"
            fill="#a1c6cc"
          />
        </svg>
      ))}
    </div>
  );
}
