import React from "react";

export default function Loading() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <svg width="64" height="64" viewBox="0 0 50 50" aria-label="Loading">
        <g>
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="#4f46e5"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="31.4 31.4"
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="0.9s"
            repeatCount="indefinite"
          />
        </g>
      </svg>
    </div>
  );
}
