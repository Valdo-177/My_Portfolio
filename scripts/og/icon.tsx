import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Mismo logo pixel 3x3 del nav
const ON = [1, 1, 0, 1, 0, 1, 1, 1, 0];

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", flexWrap: "wrap", width: 48, gap: 3 }}>
          {ON.map((on, i) => (
            <div key={i} style={{ width: 14, height: 14, background: on ? (i === 0 ? "#52a8ff" : "#ededed") : "#1a1a1a" }} />
          ))}
        </div>
      </div>
    ),
    size
  );
}
