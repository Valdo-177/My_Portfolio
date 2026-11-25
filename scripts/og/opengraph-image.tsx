import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Keyner De la Hoz — Desarrollador web y móvil, filmmaker y creador de contenido";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const K = ["10001", "10010", "11100", "10010", "10001"].join("");

export default async function OgImage() {
  const [medium, mono] = await Promise.all([
    readFile(join(process.cwd(), "scripts/og/_og/Geist-Medium.ttf")),
    readFile(join(process.cwd(), "scripts/og/_og/GeistMono-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#000",
          color: "#fff",
          padding: 72,
          fontFamily: "Geist",
          backgroundImage: "radial-gradient(rgba(255,255,255,0.10) 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", fontFamily: "GeistMono", fontSize: 22, letterSpacing: 4, color: "#8f8f8f" }}>
            <div style={{ width: 14, height: 14, background: "#52a8ff", marginRight: 18, marginTop: 6 }} />
            CÓDIGO & CONTENIDO · BARRANQUILLA, CO
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 112, lineHeight: 0.95, letterSpacing: -5 }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              KEYNER
              <div style={{ width: 22, height: 22, background: "#52a8ff", marginLeft: 22 }} />
            </div>
            <div>DE LA HOZ</div>
          </div>
          <div style={{ display: "flex", fontFamily: "GeistMono", fontSize: 24, color: "#ededed" }}>
            <span style={{ color: "#52a8ff", paddingRight: 14 }}>&gt;</span>
            <span>Developer · Filmmaker · Creador de contenido</span>
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", width: 290, gap: 10, alignSelf: "center" }}>
          {K.split("").map((on, i) => (
            <div
              key={i}
              style={{
                width: 50,
                height: 50,
                borderRadius: on === "1" ? 9 : 25,
                background: on === "1" ? (i === 12 ? "#52a8ff" : "#ededed") : "#262626",
                transform: on === "1" ? "scale(1)" : "scale(0.3)",
              }}
            />
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: medium, weight: 500, style: "normal" },
        { name: "GeistMono", data: mono, weight: 400, style: "normal" },
      ],
    }
  );
}
